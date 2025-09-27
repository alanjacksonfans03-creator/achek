interface ReceiptData {
  name: string;
  email: string;
  service: string;
  package: string;
  amount: number;
  whatsapp: string;
}

export async function sendReceiptEmail(data: ReceiptData): Promise<boolean> {
  try {
    const logoUrl = `${process.env.BASE_URL || "https://achek.com.ng"}/public/achek-logo.png`;
    // Generate a unique transaction/invoice number
    const transactionNumber = `ACH-${Date.now()}-${Math.floor(Math.random()*10000)}`;
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    const mailOptions = {
      from: 'Achek Website <info@achek.com.ng>',
      to: data.email,
      subject: `Payment Receipt - Achek Digital Solutions [${transactionNumber}]`,
      html: `
        <div style="font-family:Segoe UI,Arial,sans-serif;background:#f9fafb;padding:32px;border-radius:12px;max-width:520px;margin:auto;box-shadow:0 2px 12px #0001;">
          <img src='${logoUrl}' alt='Achek Logo' style='max-width:120px;display:block;margin-bottom:16px;' />
          <h2 style='color:#1d4ed8;margin-bottom:8px;'>Payment Receipt</h2>
          <div style='font-size:15px;margin-bottom:16px;'>
            <strong>Transaction No:</strong> ${transactionNumber}<br/>
            <strong>Date:</strong> ${formattedDate}
          </div>
          <table style='width:100%;margin-bottom:16px;'>
            <tr><td><strong>Name:</strong></td><td>${data.name}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
            <tr><td><strong>WhatsApp:</strong></td><td>${data.whatsapp}</td></tr>
            <tr><td><strong>Service:</strong></td><td>${data.service}</td></tr>
            <tr><td><strong>Package:</strong></td><td>${data.package}</td></tr>
            <tr><td><strong>Amount Paid:</strong></td><td>₦${data.amount.toLocaleString()}</td></tr>
          </table>
          <hr style='margin:24px 0;' />
          <p style='font-size:15px;'>Our team will contact you via WhatsApp at <strong>${data.whatsapp}</strong> to begin your project onboarding immediately.</p>
          <p style='font-size:15px;'>If you have any questions, reply to this email or chat us on WhatsApp.</p>
          <div style='margin-top:32px;font-size:12px;color:#888;text-align:center;'>Achek Digital Solutions &copy; 2025</div>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Failed to send receipt email:', error);
    return false;
  }
}
interface AdminNotificationData {
  name: string;
  email: string;
  service: string;
  package: string;
  amount: number;
  whatsapp: string;
}

export async function sendAdminNotification(data: AdminNotificationData): Promise<boolean> {
  try {
    const logoUrl = `${process.env.BASE_URL || "https://achek.com.ng"}/public/achek-logo.png`;
    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: process.env.ADMIN_EMAIL, // Admin/team email
      subject: `New Order - ${data.service} (${data.package})`,
      html: `
        <div style="font-family:Segoe UI,Arial,sans-serif;background:#fff;padding:32px;border-radius:12px;max-width:480px;margin:auto;">
          <img src='${logoUrl}' alt='Achek Logo' style='max-width:120px;display:block;margin-bottom:16px;' />
          <h2 style='color:#1d4ed8;'>New Order Received</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
          <p><strong>Service:</strong> ${data.service}</p>
          <p><strong>Package:</strong> ${data.package}</p>
          <p><strong>Amount Paid:</strong> ₦${data.amount.toLocaleString()}</p>
          <hr style='margin:24px 0;' />
          <p>Contact the client on WhatsApp to begin onboarding.</p>
          <div style='margin-top:32px;font-size:12px;color:#888;text-align:center;'>Achek Digital Solutions &copy; 2025</div>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return false;
  }
}

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter using your SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.MAIL_PORT) || 587,
  secure: Number(process.env.MAIL_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER_HELLO,
    pass: process.env.MAIL_PASS_HELLO,
  },
});

  // Use environment variables for sender email and password
  export const EMAIL_SENDER = process.env.EMAIL_SENDER;
  export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

  // Example usage in email sending function:
  // transporter.sendMail({
  //   from: EMAIL_SENDER,
  //   to: recipient,
  //   subject: 'Your Receipt',
  //   text: 'Thank you for your payment!',
  //   auth: { user: EMAIL_SENDER, pass: EMAIL_PASSWORD }
  // });

interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  whatsapp: string;
  projectType?: string;
  message: string;
}

export async function sendContactEmail(data: ContactMessage): Promise<boolean> {
  try {
    const mailOptions = {
      from: process.env.MAIL_FROM_HELLO,
      to: 'hello@achek.com.ng',
      subject: `New Contact Form Message from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
        <p><strong>Project Type:</strong> ${data.projectType || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error: any) {
    console.error('Failed to send contact email:', error?.message || error);
    return false;
  }
}