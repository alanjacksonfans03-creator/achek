// pages/api/messages.ts

import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { sendContactEmail } from "../../../../server/email";

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }


  // Log incoming data for debugging
  console.log("Incoming contact data:", req.body);

  // Trim all fields to avoid whitespace issues
  const name = req.body.name?.trim();
  const email = req.body.email?.trim();
  const phone = req.body.phone?.trim();
  const whatsapp = req.body.whatsapp?.trim();
  const projectType = req.body.projectType?.trim();
  const message = req.body.message?.trim();

  if (!name) {
    return res.status(400).json({ success: false, message: "Missing or empty field: name" });
  }
  if (!email) {
    return res.status(400).json({ success: false, message: "Missing or empty field: email" });
  }
  if (!whatsapp) {
    return res.status(400).json({ success: false, message: "Missing or empty field: whatsapp" });
  }
  if (!message) {
    return res.status(400).json({ success: false, message: "Missing or empty field: message" });
  }

  try {
    const sent = await sendContactEmail({
      name,
      email,
      phone,
      whatsapp,
      projectType,
      message,
    });
    if (sent) {
      return res.status(200).json({
        success: true,
        message: "Message sent! We'll be in touch soon 🚀",
      });
    } else {
      return res.status(500).json({ success: false, message: "Failed to send email. Please try again later." });
    }
  } catch (err: any) {
    console.error("❌ Email send error:", err);
    return res.status(500).json({ success: false, message: err?.message || "Server error. Try again later." });
  }
}
