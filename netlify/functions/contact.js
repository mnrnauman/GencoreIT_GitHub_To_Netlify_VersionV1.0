const nodemailer = require("nodemailer");

const RECIPIENT_EMAIL = "nauman@gencoreit.com";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ message: "Method not allowed" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ message: "Invalid request body" }) };
  }

  const { name, email, company, message } = body;
  if (!name || !email || !message) {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: "Name, email, and message are required." }) };
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });

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
    } catch (err) {
      console.error("Failed to send email:", err.message);
    }
  }

  return {
    statusCode: 201,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: true, message: "Thank you for your message. We will get back to you soon!" }),
  };
};
