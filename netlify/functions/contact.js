const { Resend } = require("resend");

const RECIPIENT_EMAILS = ["info@gencoreit.com", "mnrnauman@gmail.com"];
const FROM_SENDER = "Gencore Website <noreply@gencoreit.com>";

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

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_SENDER,
      to: RECIPIENT_EMAILS,
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
          <p style="margin-top:24px;font-size:12px;color:#9ca3af;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error (contact):", JSON.stringify(error));
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: false, message: "Failed to send message. Please try again." }),
      };
    }

    console.log(`Contact email sent — Resend ID: ${data?.id}`);

    await resend.emails.send({
      from: FROM_SENDER,
      to: email,
      subject: "We received your message — Gencore",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
          <h2 style="color:#1e3a5f;border-bottom:2px solid #f97316;padding-bottom:12px;">Thank you, ${name}!</h2>
          <p style="color:#374151;line-height:1.6;">We've received your message and will get back to you within 1 business day.</p>
          <div style="background:#f9fafb;padding:16px;border-radius:6px;margin:16px 0;">
            <p style="font-weight:bold;color:#374151;margin:0 0 8px 0;">Your message:</p>
            <p style="color:#6b7280;line-height:1.6;margin:0;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="color:#374151;line-height:1.6;">In the meantime, feel free to call us at <strong>+92 332 0000911</strong> or visit our office at 4th Floor, Saeed Alam Tower, Liberty Market, Lahore.</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
          <p style="color:#9ca3af;font-size:12px;margin:0;">Gencore — The Core of Digital Transformation.<br>info@gencoreit.com | gencoreit.com</p>
        </div>
      `,
    });

    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, message: "Thank you for your message. We will get back to you soon!" }),
    };
  } catch (err) {
    console.error("Contact email exception:", err.message);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, message: "Failed to send message. Please try again." }),
    };
  }
};
