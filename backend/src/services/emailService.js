import nodemailer from "nodemailer";

let transporter;

function createTransporter() {
  const user = process.env.EMAIL_USER;
  const password = process.env.EMAIL_APP_PASSWORD?.replaceAll(" ", "");

  if (!user || !password) {
    const error = new Error("Email delivery is not configured.");
    error.code = "EMAIL_NOT_CONFIGURED";
    throw error;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 465,
    secure: (Number(process.env.EMAIL_PORT) || 465) === 465,
    auth: { user, pass: password },
  });
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendBookingNotification(booking) {
  transporter ||= createTransporter();

  const recipient = process.env.CONTACT_TO_EMAIL || process.env.EMAIL_USER;
  const safeName = booking.name.replace(/[\r\n]+/g, " ");
  const preferredDate = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeZone: "UTC",
  }).format(booking.preferredDate);

  const text = [
    `New portfolio enquiry from ${booking.name}`,
    "",
    `Email: ${booking.email}`,
    `Company: ${booking.company || "Not provided"}`,
    `Conversation: ${booking.meetingType}`,
    `Preferred date: ${preferredDate}`,
    `Timezone: ${booking.timezone}`,
    `Budget: ${booking.budget || "Not provided"}`,
    "",
    "Message:",
    booking.message,
  ].join("\n");

  await transporter.sendMail({
    from: `"Ahmed Fayyaz Portfolio" <${process.env.EMAIL_USER}>`,
    to: recipient,
    replyTo: { name: safeName, address: booking.email },
    subject: `[Portfolio] ${booking.meetingType} from ${safeName}`,
    text,
    html: `
      <div style="background:#eef2f5;padding:32px;font-family:Arial,sans-serif;color:#0b1e33">
        <div style="max-width:640px;margin:auto;background:#ffffff;border:1px solid #d8e0e7;border-radius:18px;overflow:hidden">
          <div style="background:#0b1e33;padding:24px 28px;color:#ffffff">
            <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#8cc8ff">Portfolio enquiry</div>
            <h1 style="margin:10px 0 0;font-size:26px">${escapeHtml(booking.meetingType)}</h1>
          </div>
          <div style="padding:28px">
            <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6">
              <tr><td style="padding:7px 12px 7px 0;color:#637080">Name</td><td style="padding:7px 0;font-weight:700">${escapeHtml(booking.name)}</td></tr>
              <tr><td style="padding:7px 12px 7px 0;color:#637080">Email</td><td style="padding:7px 0"><a href="mailto:${escapeHtml(booking.email)}" style="color:#2d69a7">${escapeHtml(booking.email)}</a></td></tr>
              <tr><td style="padding:7px 12px 7px 0;color:#637080">Company</td><td style="padding:7px 0">${escapeHtml(booking.company || "Not provided")}</td></tr>
              <tr><td style="padding:7px 12px 7px 0;color:#637080">Preferred date</td><td style="padding:7px 0">${escapeHtml(preferredDate)}</td></tr>
              <tr><td style="padding:7px 12px 7px 0;color:#637080">Timezone</td><td style="padding:7px 0">${escapeHtml(booking.timezone)}</td></tr>
              <tr><td style="padding:7px 12px 7px 0;color:#637080">Budget</td><td style="padding:7px 0">${escapeHtml(booking.budget || "Not provided")}</td></tr>
            </table>
            <div style="margin-top:22px;padding-top:20px;border-top:1px solid #e4e9ee">
              <div style="margin-bottom:8px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#637080">Message</div>
              <p style="margin:0;white-space:pre-wrap;font-size:15px;line-height:1.7">${escapeHtml(booking.message)}</p>
            </div>
          </div>
        </div>
      </div>
    `,
  });
}
