import { sendReceiptEmail } from "./email";
const testReceiptRoute = express.Router();
testReceiptRoute.post("/api/test-send-receipt", async (req, res) => {
  try {
    const testData = {
      name: "Test User",
      email: req.body.email || "info@achek.com.ng",
      service: "Test Service",
      package: "Test Package",
      amount: 1000,
      whatsapp: "08012345678"
    };
    const sent = await sendReceiptEmail(testData);
    if (sent) {
      res.json({ success: true, message: "Test receipt email sent." });
    } else {
      res.status(500).json({ success: false, message: "Failed to send test receipt email." });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

import type { Express, Request, Response } from "express";
import express from "express";
import cron from "node-cron";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { insertUserSchema, insertPortfolioSchema, insertTestimonialSchema, insertMessageSchema, insertNewsletterSchema } from "@shared/schema";
import { sendContactEmail, sendAdminNotification } from "./email";
import paymentStatusRouter from "./payment-status";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const EMAIL_FILE = path.join(__dirname, "data/newsletter-emails.txt");

export async function registerRoutes(app: Express): Promise<Server> {

  // WhatsApp receipt API disabled for now
  let sendWhatsAppReceipt: any = null;
  let whatsappReceipts: any = null;

  // Attach the test receipt route globally
  app.use(testReceiptRoute);
  // Attach payment status route
  app.use(paymentStatusRouter);
  // Receipt email after payment
  app.post("/api/send-receipt", async (req, res) => {
    try {
      const { name, email, service, package: pkg, amount, whatsapp } = req.body;
      // Send receipt email with logo
      const emailSent = await sendReceiptEmail({ name, email, service, package: pkg, amount, whatsapp });
      // Notify admin/team (always send to caleb@achek.com.ng)
      const adminNotified = await sendAdminNotification({
        name,
        email,
        service,
        package: pkg,
        amount,
        whatsapp
      });
      // Log order for dashboard
      if (typeof storage.logOrder === "function") {
        storage.logOrder({ name, email, service, package: pkg, amount, whatsapp });
      }


      res.json({ success: emailSent && adminNotified });
    } catch (error) {
      console.error("Failed to send receipt or WhatsApp message:", error);
      res.status(500).json({ success: false, error: "Failed to send receipt or WhatsApp message" });
    }
  });

  // Dashboard: get all orders
  app.get("/api/orders", async (req, res) => {
    try {
      if (typeof storage.getOrders === "function") {
        const orders = storage.getOrders();
        res.json(orders);
      } else {
        res.json([]);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders", error });
    }
  });
  // Authentication middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, email, passwordHash } = insertUserSchema.parse(req.body);

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(passwordHash, 10);

      const user = await storage.createUser({
        username,
        email,
        passwordHash: hashedPassword
      });

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

      res.json({ 
        message: "User created successfully", 
        user: { id: user.id, username: user.username, email: user.email },
        token 
      });
    } catch (error) {
      res.status(400).json({ message: "Registration failed", error });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

      res.json({ 
        message: "Login successful", 
        user: { id: user.id, username: user.username, email: user.email },
        token 
      });
    } catch (error) {
      res.status(400).json({ message: "Login failed", error });
    }
  });

  // Portfolio routes
  app.get("/api/portfolio", async (req, res) => {
    try {
      const portfolioItems = await storage.getPortfolioProjects();
      res.json(portfolioItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio", error });
    }
  });

  app.post("/api/portfolio", authenticateToken, async (req, res) => {
    try {
      const portfolioData = insertPortfolioSchema.parse(req.body);
      const portfolioItem = await storage.createPortfolio(portfolioData);
      res.json({ message: "Portfolio item created", item: portfolioItem });
    } catch (error) {
      res.status(400).json({ message: "Failed to create portfolio item", error });
    }
  });

  // Testimonials routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonialsData = await storage.getTestimonials();
      res.json(testimonialsData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials", error });
    }
  });

  app.post("/api/testimonials", authenticateToken, async (req, res) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(testimonialData);
      res.json({ message: "Testimonial created", testimonial });
    } catch (error) {
      res.status(400).json({ message: "Failed to create testimonial", error });
    }
  });

  // Messages routes
  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      console.log('Received contact message:', messageData);

      // Try to send email
      const emailSent = await sendContactEmail(messageData);

      if (emailSent) {
        res.json({ message: "Message sent successfully" });
      } else {
        // If email fails, at least log the message for manual review
        console.log('Email failed, but storing message locally:', messageData);
        res.status(500).json({ 
          message: "Email delivery failed, but your message has been received. We'll contact you via WhatsApp." 
        });
      }
    } catch (error) {
      console.error('Message endpoint error:', error);
      res.status(400).json({ message: "Failed to process message", error: error.message });
    }
  });

  app.get("/api/messages", authenticateToken, async (req, res) => {
    try {
      // Since messages are sent via email only, return empty array
      res.json([]);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages", error });
    }
  });

  // Newsletter routes
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: "Email required" });

      // Read file and check for existing email
      let data = "";
      try {
        data = fs.readFileSync(EMAIL_FILE, "utf8");
      } catch (err: any) {
        if (err.code !== "ENOENT") return res.status(500).json({ message: "Server error" });
      }
      const emails = data ? data.split("\n").map(e => e.trim()) : [];
      if (emails.includes(email)) {
        return res.status(409).json({ message: "This email is already subscribed to the newsletter." });
      }

      // Append email to file
      fs.appendFileSync(EMAIL_FILE, email + "\n");
      res.json({ message: "Newsletter subscription successful" });
    } catch (error) {
      res.status(400).json({ message: "Newsletter subscription failed", error });
    }
  });

  // Newsletter get all (remove authentication)
  app.get("/api/newsletter", async (req, res) => {
    try {
      let data = "";
      try {
        data = fs.readFileSync(EMAIL_FILE, "utf8");
      } catch (err: any) {
        if (err.code !== "ENOENT") return res.status(500).json({ message: "Server error" });
      }
      const emails = data ? data.split("\n").filter(e => e.trim()) : [];
      console.log("Newsletter subscribers:", emails); // Debug line
      res.json(emails);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch newsletter subscriptions", error });
    }
  });

  // In-memory scheduled jobs (for demo; use DB for production)
  const scheduledJobs: { [id: string]: cron.ScheduledTask } = {};

  app.post("/api/newsletter/send", async (req, res) => {
    try {
      const { subject, content, recipients, schedule, logoUrl } = req.body;
      if (!subject || !content || !recipients || recipients.length === 0) {
        return res.status(400).json({ message: "Subject, content, and recipients are required" });
      }
      const nodemailer = require('nodemailer');
      let transporter;
      try {
        transporter = nodemailer.createTransport({
          host: process.env.MAIL_HOST,
          port: parseInt(process.env.MAIL_PORT || '465'),
          secure: true,
          auth: {
            user: process.env.MAIL_USER_NEWS,
            pass: process.env.MAIL_PASS_NEWS,
          },
        });
        // Verify connection
        await transporter.verify();
      } catch (mailErr) {
        console.error('Mail server connection failed:', mailErr);
        return res.status(500).json({ message: 'Mail server connection failed. Please check your mail settings.', error: mailErr });
      }
      const baseUrl = process.env.BASE_URL || "https://achek.com.ng";
      // Helper: rewrite links for click tracking
      const rewriteLinks = (html, email) =>
        html.replace(/<a\s+([^>]*?)href=["']([^"']+)["']([^>]*)>/gi, (match, pre, href, post) => {
          if (/^https?:\/\//.test(href)) {
            const tracked = `${baseUrl}/api/newsletter/track-click?email=${encodeURIComponent(email)}&url=${encodeURIComponent(href)}`;
            return `<a ${pre}href="${tracked}"${post}>`;
          }
          return match;
        });
      // Helper: add tracking pixel for opens
      const addTrackingPixel = (html, email) => {
        const pixel = `<img src="${baseUrl}/api/newsletter/track-open?email=${encodeURIComponent(email)}" width="1" height="1" style="display:none;" alt="" />`;
        return html + pixel;
      };
      const sendToAll = async () => {
        const emailPromises = recipients.map(async (email) => {
          const unsubscribeUrl = `${baseUrl}/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
          let html = content;
          if (logoUrl) {
            html = `<img src='${logoUrl}' alt='Logo' style='max-width:120px;display:block;margin-bottom:16px;'/>` + html;
          }
          html += `<div style='margin-top:32px;font-size:12px;color:#888;text-align:center;'>If you wish to unsubscribe, <a href='${unsubscribeUrl}'>click here</a>.</div>`;
          html = rewriteLinks(html, email);
          html = addTrackingPixel(html, email);
          try {
            await transporter.sendMail({
              from: process.env.MAIL_FROM_NEWS,
              to: email,
              subject: subject,
              html,
            });
            if (storage.logNewsletterEvent) {
              await storage.logNewsletterEvent({ type: 'send', email, subject, timestamp: new Date() });
            }
          } catch (sendErr) {
            console.error(`Failed to send to ${email}:`, sendErr);
            // Optionally, collect failed emails for admin feedback
            throw new Error(`Failed to send to ${email}: ${sendErr.message}`);
          }
        });
        await Promise.all(emailPromises);
      };
      if (schedule) {
        // Use node-cron for advanced scheduling
        const date = new Date(schedule);
        if (isNaN(date.getTime()) || date < new Date()) {
          return res.status(400).json({ message: "Invalid schedule date/time" });
        }
        // Convert date to cron expression
        const cronExpr = `${date.getUTCMinutes()} ${date.getUTCHours()} ${date.getUTCDate()} ${date.getUTCMonth() + 1} *`;
        const jobId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        scheduledJobs[jobId] = cron.schedule(cronExpr, async () => {
          try {
            await sendToAll();
          } catch (err) {
            console.error('Scheduled newsletter send failed:', err);
          }
          scheduledJobs[jobId].stop();
          delete scheduledJobs[jobId];
        }, { timezone: 'UTC' });
        res.json({ message: `Newsletter scheduled for ${schedule} (UTC)` });
      } else {
        try {
          await sendToAll();
          res.json({ message: `Newsletter sent successfully to ${recipients.length} recipients` });
        } catch (err) {
          res.status(500).json({ message: `Failed to send newsletter: ${err.message}`, error: err });
        }
      }
    } catch (error) {
      console.error('Failed to send newsletter:', error);
      res.status(500).json({ message: "Failed to send newsletter", error });
    }
  });

  // Track open (pixel)
  app.get("/api/newsletter/track-open", async (req: Request, res: Response) => {
    const email = req.query.email;
    if (storage.logNewsletterEvent && email) {
      await storage.logNewsletterEvent({ type: 'open', email, timestamp: new Date() });
    }
    // 1x1 transparent GIF
    const img = Buffer.from(
      "R0lGODlhAQABAPAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
      "base64"
    );
    res.set('Content-Type', 'image/gif');
    res.send(img);
  });

  // Track click
  app.get("/api/newsletter/track-click", async (req: Request, res: Response) => {
    const { email, url } = req.query;
    if (storage.logNewsletterEvent && email && url) {
      await storage.logNewsletterEvent({ type: 'click', email, url, timestamp: new Date() });
    }
    // Redirect to actual URL
    if (url && typeof url === 'string') {
      res.redirect(url);
    } else {
      res.status(400).send("Invalid URL");
    }
  });

  // Unsubscribe route
  app.get("/api/newsletter/unsubscribe", async (req, res) => {
    const email = req.query.email;
    if (!email) return res.status(400).send("Missing email");
    try {
      await storage.unsubscribeNewsletter(email);
      res.send(`
        <html>
          <head>
            <title>Unsubscribed | Achek Newsletter</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; background: #f9fafb; color: #222; margin: 0; padding: 0; }
              .container { max-width: 420px; margin: 48px auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px #0001; padding: 32px 24px; text-align: center; }
              .logo { width: 80px; margin-bottom: 16px; }
              h2 { color: #1d4ed8; margin-bottom: 8px; }
              .feedback { margin-top: 32px; }
              textarea { width: 100%; border-radius: 6px; border: 1px solid #ddd; padding: 8px; min-height: 60px; }
              button { background: #1d4ed8; color: #fff; border: none; border-radius: 6px; padding: 10px 24px; font-weight: 600; margin-top: 12px; cursor: pointer; }
              .thanks { color: #16a34a; margin-top: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <img src="/public/achek-logo.png" alt="Achek Logo" class="logo" />
              <h2>You have been unsubscribed</h2>
              <p>We're sorry to see you go. You will no longer receive newsletters from us.</p>
              <div class="feedback">
                <form method="POST" action="/api/newsletter/unsubscribe-feedback">
                  <input type="hidden" name="email" value="${email}" />
                  <label for="reason">Why did you unsubscribe?</label><br />
                  <textarea name="reason" id="reason" placeholder="Your feedback helps us improve!"></textarea><br />
                  <button type="submit">Send Feedback</button>
                </form>
              </div>
            </div>
          </body>
        </html>
      `);
    } catch (err) {
      res.status(500).send("Failed to unsubscribe. Please try again later.");
    }
  });

  // Unsubscribe feedback route
  app.post("/api/newsletter/unsubscribe-feedback", express.urlencoded({ extended: true }), async (req: Request, res: Response) => {
    const { email, reason } = req.body;
    // For now, just log feedback. In production, store in DB or send to admin.
    console.log(`Unsubscribe feedback from ${email}: ${reason}`);
    res.send(`<html><body style='font-family:sans-serif;text-align:center;padding:48px;'><h2 class='thanks'>Thank you for your feedback!</h2><p>We appreciate your input.</p></body></html>`);
  });

  const httpServer = createServer(app);
  return httpServer;
}