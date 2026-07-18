import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const RECIPIENT_EMAIL = "info@gencoreit.com";
const FROM_EMAIL = "noreply@gencoreit.com";

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/contact", async (req, res) => {
  const { name, email, company, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Name, email, and message are required." });
  }

  try {
    const { error } = await resend.emails.send({
      from: `Gencore Website <${FROM_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
          <h2 style="color:#1e3a5f;border-bottom:2px solid #f97316;padding-bottom:12px;">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151;width:120px;">Name:</td><td style="padding:8px 0;color:#111827;">${name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Email:</td><td style="padding:8px 0;color:#111827;"><a href="mailto:${email}" style="color:#f97316;">${email}</a></td></tr>
            ${company ? `<tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Company:</td><td style="padding:8px 0;color:#111827;">${company}</td></tr>` : ""}
          </table>
          <div style="margin-top:16px;">
            <p style="font-weight:bold;color:#374151;margin-bottom:8px;">Message:</p>
            <div style="background:#f9fafb;padding:16px;border-radius:6px;color:#111827;line-height:1.6;">${message.replace(/\n/g, "<br>")}</div>
          </div>
          <p style="margin-top:24px;font-size:12px;color:#9ca3af;">Sent via Gencore website contact form</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error (contact):", error);
      return res.status(500).json({ success: false, message: "Failed to send message. Please try again." });
    }

    console.log(`Contact email sent from ${email}`);
    res.status(201).json({ success: true, message: "Thank you for your message. We will get back to you soon!" });
  } catch (err) {
    console.error("Contact email exception:", err.message);
    res.status(500).json({ success: false, message: "Failed to send message. Please try again." });
  }
});

app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required." });
  }

  try {
    const { error } = await resend.emails.send({
      from: `Gencore Website <${FROM_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      subject: "New Newsletter Subscription",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
          <h2 style="color:#1e3a5f;border-bottom:2px solid #f97316;padding-bottom:12px;">New Newsletter Subscription</h2>
          <p style="color:#374151;">A new visitor has subscribed to the Gencore newsletter.</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151;width:120px;">Email:</td><td style="padding:8px 0;color:#111827;"><a href="mailto:${email}" style="color:#f97316;">${email}</a></td></tr>
          </table>
          <p style="margin-top:24px;font-size:12px;color:#9ca3af;">Sent via Gencore website newsletter signup</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error (subscribe):", error);
      return res.status(500).json({ success: false, message: "Failed to subscribe. Please try again." });
    }

    console.log(`Newsletter subscription email sent for ${email}`);
    res.json({ success: true, message: "You have been subscribed successfully!" });
  } catch (err) {
    console.error("Subscribe email exception:", err.message);
    res.status(500).json({ success: false, message: "Failed to subscribe. Please try again." });
  }
});

app.get("/api/testimonials", (req, res) => {
  res.json({
    testimonials: [
      {
        id: 1,
        name: "Sarah Johnson",
        position: "CTO, TravelEase Inc.",
        content: "Gencore's cloud migration solution transformed our operations. Their team was professional, responsive, and delivered exactly what we needed. The 24/7 support gives us peace of mind.",
        rating: 5
      },
      {
        id: 2,
        name: "Michael Rodriguez",
        position: "CEO, MetroProp Holdings",
        content: "Our custom CRM from Gencore has streamlined our property management process completely. The attention to detail and understanding of our industry needs was impressive.",
        rating: 5
      },
      {
        id: 3,
        name: "Dr. Amanda Chen",
        position: "Director, HealthFirst Medical Group",
        content: "The cybersecurity system Gencore implemented for our healthcare practice has given us complete confidence in our data protection. Their knowledge of HIPAA compliance was invaluable.",
        rating: 5
      }
    ]
  });
});

app.get("/vps-hosting", (req, res) => {
  res.sendFile(path.join(__dirname, "vps-hosting.html"));
});

app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Gencore website running on port ${PORT}`);
  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠ RESEND_API_KEY not set — emails will not be sent.");
  } else {
    console.log("✓ Resend email service configured");
  }
});
