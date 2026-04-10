import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const RECIPIENT_EMAIL = "info@gencoreit.com";

function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

app.post("/api/contact", async (req, res) => {
  const { name, email, company, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Name, email, and message are required." });
  }

  const transporter = createTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: RECIPIENT_EMAIL,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
        replyTo: email,
      });
      console.log(`Contact email sent from ${email}`);
    } catch (err) {
      console.error("Failed to send contact email:", err.message);
    }
  } else {
    console.log("Contact form submission (email not configured):", { name, email, company, message });
  }

  res.status(201).json({
    success: true,
    message: "Thank you for your message. We will get back to you soon!",
  });
});

app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required." });
  }

  const transporter = createTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: RECIPIENT_EMAIL,
        subject: "New Newsletter Subscription",
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p>This visitor has subscribed to the GENCORE IT newsletter.</p>
        `,
      });
      console.log(`Newsletter subscription email sent for ${email}`);
    } catch (err) {
      console.error("Failed to send subscription email:", err.message);
    }
  } else {
    console.log("Newsletter subscription (email not configured):", email);
  }

  res.json({ success: true, message: "You have been subscribed successfully!" });
});

app.get("/api/testimonials", (req, res) => {
  res.json({
    testimonials: [
      {
        id: 1,
        name: "Sarah Johnson",
        position: "CTO, TravelEase Inc.",
        content: "GENCORE IT's cloud migration solution transformed our operations. Their team was professional, responsive, and delivered exactly what we needed. The 24/7 support gives us peace of mind.",
        rating: 5
      },
      {
        id: 2,
        name: "Michael Rodriguez",
        position: "CEO, MetroProp Holdings",
        content: "Our custom CRM from GENCORE IT has streamlined our property management process completely. The attention to detail and understanding of our industry needs was impressive.",
        rating: 5
      },
      {
        id: 3,
        name: "Dr. Amanda Chen",
        position: "Director, HealthFirst Medical Group",
        content: "The cybersecurity system GENCORE IT implemented for our healthcare practice has given us complete confidence in our data protection. Their knowledge of HIPAA compliance was invaluable.",
        rating: 5
      }
    ]
  });
});

app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`GENCORE IT website running on port ${PORT}`);
  if (!process.env.SMTP_HOST) {
    console.log("⚠ Email not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS to enable email sending.");
  }
});
