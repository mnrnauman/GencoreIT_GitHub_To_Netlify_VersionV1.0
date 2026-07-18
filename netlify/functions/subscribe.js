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

  const { email } = body;
  if (!email) {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: "Email is required." }) };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_SENDER,
      to: RECIPIENT_EMAILS,
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
      console.error("Resend error (subscribe):", JSON.stringify(error));
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: false, message: "Failed to subscribe. Please try again." }),
      };
    }

    console.log(`Newsletter subscription sent — Resend ID: ${data?.id}`);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, message: "You have been subscribed successfully!" }),
    };
  } catch (err) {
    console.error("Subscribe email exception:", err.message);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, message: "Failed to subscribe. Please try again." }),
    };
  }
};
