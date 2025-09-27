import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import uploadRouter from "./upload";
import { setupVite, serveStatic } from "./vite";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { SitemapStream, streamToPromise } from "sitemap";

// Load environment variables first
dotenv.config();

const app = express();
app.use(uploadRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Sitemap endpoint
app.get("/sitemap.xml", async (req, res) => {
  try {
    const smStream = new SitemapStream({ hostname: "https://achek.com.ng" });

    smStream.write({ url: "/", changefreq: "daily", priority: 1.0 });
    smStream.write({ url: "/about", changefreq: "monthly", priority: 0.7 });
    smStream.write({ url: "/contact", changefreq: "monthly", priority: 0.7 });
    // Add more URLs here

    smStream.end();
    const sitemap = await streamToPromise(smStream);

    res.header("Content-Type", "application/xml");
    res.send(sitemap.toString());
  } catch (err) {
    res.status(500).end();
  }
});

// Initialize app
async function initializeApp() {
  const server = await registerRoutes(app);

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const PORT = process.env.PORT || 5000;
  server.listen(Number(PORT), "0.0.0.0", () => {
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "medium",
    }).format(new Date());

    console.log(`${formattedTime} [express] serving on port ${PORT}`);
    console.log(`Server accessible at: https://${process.env.REPL_SLUG || 'your-repl'}.${process.env.REPL_OWNER || 'username'}.repl.co`);
  });
}

initializeApp().catch(console.error);
