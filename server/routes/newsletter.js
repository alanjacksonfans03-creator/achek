const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const EMAIL_FILE = path.join(__dirname, "../data/newsletter-emails.txt");

router.post("/subscribe", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  // Check if email already exists
  fs.readFile(EMAIL_FILE, "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") return res.status(500).json({ message: "Server error" });

    const emails = data ? data.split("\n").map(e => e.trim()) : [];
    if (emails.includes(email)) {
      return res.status(200).json({ message: "Already subscribed" });
    }

    // Append email to file
    fs.appendFile(EMAIL_FILE, email + "\n", (err) => {
      if (err) return res.status(500).json({ message: "Failed to save email" });
      return res.status(200).json({ message: "Subscribed successfully" });
    });
  });
});

// Get all newsletter emails (admin)
router.get("/emails", (req, res) => {
  fs.readFile(EMAIL_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Server error" });
    const emails = data ? data.split("\n").filter(e => e.trim()) : [];
    res.json({ emails });
  });
});

// Send newsletter to selected emails (admin)
router.post("/send", async (req, res) => {
  const { subject, content, recipients } = req.body;
  if (!subject || !content || !Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).json({ message: "Missing subject, content, or recipients" });
  }

  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: Number(process.env.MAIL_PORT) === 465,
    auth: {
      user: process.env.MAIL_USER_NEWS,
      pass: process.env.MAIL_PASS_NEWS,
    },
  });

  try {
    let sentCount = 0;
    for (const email of recipients) {
      const mailOptions = {
        from: process.env.MAIL_FROM_NEWS || 'Achek Newsletter <newsletter@achek.com.ng>',
        to: email,
        subject,
        html: content,
      };
      await transporter.sendMail(mailOptions);
      sentCount++;
    }
    res.json({ message: "Newsletter sent", count: sentCount });
  } catch (error) {
    console.error('Newsletter send error:', error);
    res.status(500).json({ message: "Failed to send newsletter", error: error.message });
  }
});

module.exports = router;