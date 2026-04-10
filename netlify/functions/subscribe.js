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

  const { email } = body;
  if (!email) {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: "Email is required." }) };
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
        subject: "New Newsletter Subscription",
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p>This visitor has subscribed to the GENCORE IT newsletter.</p>
        `,
      });
    } catch (err) {
      console.error("Failed to send email:", err.message);
    }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: true, message: "You have been subscribed successfully!" }),
  };
};
