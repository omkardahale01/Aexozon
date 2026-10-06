import nodemailer from 'nodemailer';

/**
 * Email Service
 * 
 * Handles sending professional emails via SMTP (Gmail).
 */

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

/**
 * Generates a professional HTML email template for auto-response to the user.
 * No emoji. No extra text. Clean and professional.
 */
const generateAutoReplyHTML = (name) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px; border-bottom: 1px solid rgba(255,255,255,0.08);">
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px;">
                AEXOZON
              </h1>
              <p style="margin: 4px 0 0; font-size: 12px; color: rgba(255,255,255,0.3); letter-spacing: 0.5px;">
                Enterprise SaaS Solutions
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 600; color: #ffffff; line-height: 1.3;">
                Thank you for reaching out, ${name}.
              </h2>
              
              <p style="margin: 0 0 16px; font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.7;">
                We have received your requirements. Our team will review the details and schedule a consultation with you at the earliest.
              </p>

              <p style="margin: 0 0 16px; font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.7;">
                You can expect a response within <strong style="color: rgba(255,255,255,0.8);">24 hours</strong>. If you have any urgent queries, feel free to reach us via WhatsApp or phone.
              </p>

              <p style="margin: 0 0 32px; font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.7;">
                We look forward to working with you.
              </p>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right: 12px;">
                    <a href="https://wa.me/917030727201" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #ffffff; color: #000000; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 50px;">
                      WhatsApp Us
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Info -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid rgba(255,255,255,0.08); background-color: rgba(255,255,255,0.02);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 8px 0;">
                    <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Contact Details</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;">
                    <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.45);">
                      Email: omkardahaleofficial@gmail.com
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;">
                    <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.45);">
                      Phone: +91 7030727201
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;">
                    <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.45);">
                      Location: Pune, Maharashtra, India
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid rgba(255,255,255,0.06);">
              <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.2); text-align: center;">
                ${new Date().getFullYear()} AEXOZON. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

/**
 * Generates HTML for lead notification email sent to admin
 */
const generateAdminNotificationHTML = (name, email, phone, service, message) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          
          <tr>
            <td style="padding: 32px 40px; border-bottom: 1px solid rgba(255,255,255,0.08);">
              <h1 style="margin: 0; font-size: 18px; font-weight: 700; color: #ffffff;">
                Lead from Website
              </h1>
              <p style="margin: 4px 0 0; font-size: 12px; color: rgba(255,255,255,0.3);">
                ${new Date().toLocaleString()}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 32px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
                    <p style="margin: 0 0 4px; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1px;">Name</p>
                    <p style="margin: 0; font-size: 15px; color: #ffffff; font-weight: 500;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
                    <p style="margin: 0 0 4px; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1px;">Email</p>
                    <p style="margin: 0; font-size: 15px; color: #ffffff;">
                      <a href="mailto:${email}" style="color: #ffffff; text-decoration: underline;">${email}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
                    <p style="margin: 0 0 4px; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1px;">Phone</p>
                    <p style="margin: 0; font-size: 15px; color: #ffffff;">${phone || 'Not provided'}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
                    <p style="margin: 0 0 4px; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1px;">Service Required</p>
                    <p style="margin: 0; font-size: 15px; color: #ffffff;">${service || 'Not specified'}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0 0 4px; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1px;">Project Details</p>
                    <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.6;">${message}</p>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top: 24px;">
                <tr>
                  <td style="padding-right: 12px;">
                    <a href="mailto:${email}" style="display: inline-block; padding: 10px 20px; background-color: #ffffff; color: #000000; font-size: 12px; font-weight: 600; text-decoration: none; border-radius: 50px;">
                      Reply to ${name}
                    </a>
                  </td>
                  <td>
                    <a href="tel:${phone}" style="display: inline-block; padding: 10px 20px; border: 1px solid rgba(255,255,255,0.2); color: #ffffff; font-size: 12px; font-weight: 600; text-decoration: none; border-radius: 50px;">
                      Call ${name}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 20px 40px; border-top: 1px solid rgba(255,255,255,0.06);">
              <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.2); text-align: center;">
                Sent from AEXOZON Website
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

/**
 * Send auto-reply email to the user who submitted the contact form
 */
export const sendAutoReplyEmail = async (toEmail, name) => {
  try {
    const transporter = createTransporter();
    
    await transporter.sendMail({
      from: `"AEXOZON" <${process.env.SMTP_EMAIL}>`,
      to: toEmail,
      subject: 'Thank you for contacting AEXOZON',
      html: generateAutoReplyHTML(name),
    });

    console.log(`Auto-reply email sent to ${toEmail}`);
  } catch (error) {
    console.error('Failed to send auto-reply email:', error.message);
    // Don't throw — email failure shouldn't block the contact form submission
  }
};

/**
 * Send notification email to admin about new lead from website
 */
export const sendAdminNotification = async (name, email, phone, service, message) => {
  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"AEXOZON Website" <${process.env.SMTP_EMAIL}>`,
      to: 'omkardahaleofficial@gmail.com, skhandagle1233@gmail.com',
      subject: `Lead from Website - ${name}`,
      html: generateAdminNotificationHTML(name, email, phone, service, message),
    });

    console.log('Admin notification email sent to both recipients.');
  } catch (error) {
    console.error('Failed to send admin notification:', error.message);
  }
};

/**
 * Send booking confirmation email to a client who completed the chatbot flow
 */
export const sendChatbotBookingEmail = async (toEmail, name, service, budget, details, bookingId) => {
  try {
    const transporter = createTransporter();

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

          <tr>
            <td style="padding: 32px 40px; border-bottom: 1px solid rgba(255,255,255,0.08);">
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px;">
                AEXOZON
              </h1>
              <p style="margin: 4px 0 0; font-size: 12px; color: rgba(255,255,255,0.3); letter-spacing: 0.5px;">
                Booking Confirmation
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 600; color: #ffffff; line-height: 1.3;">
                Your booking is confirmed, ${name}!
              </h2>

              <p style="margin: 0 0 24px; font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.7;">
                Thank you for reaching out through our chatbot. Here's a summary of your project request:
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                    <p style="margin: 0 0 2px; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1px;">Booking ID</p>
                    <p style="margin: 0; font-size: 15px; color: #ffffff; font-weight: 600;">#${bookingId}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                    <p style="margin: 0 0 2px; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1px;">Service</p>
                    <p style="margin: 0; font-size: 15px; color: #ffffff;">${service}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                    <p style="margin: 0 0 2px; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1px;">Budget Range</p>
                    <p style="margin: 0; font-size: 15px; color: #ffffff;">${budget}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0 0 2px; font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1px;">Project Details</p>
                    <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.6;">${details}</p>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 8px; font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.7;">
                <strong style="color: rgba(255,255,255,0.8);">What happens next?</strong>
              </p>
              <p style="margin: 0 0 8px; font-size: 14px; color: rgba(255,255,255,0.5);">
                Our team will review your requirements and reach out within <strong style="color: rgba(255,255,255,0.8);">24 hours</strong> to schedule a free consultation.
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top: 24px;">
                <tr>
                  <td style="padding-right: 12px;">
                    <a href="https://wa.me/918999427831" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #ffffff; color: #000000; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 50px;">
                      WhatsApp Us
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid rgba(255,255,255,0.08); background-color: rgba(255,255,255,0.02);">
              <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Contact</p>
              <p style="margin: 6px 0 0; font-size: 13px; color: rgba(255,255,255,0.45);">Email: omkardahaleofficial@gmail.com</p>
              <p style="margin: 4px 0 0; font-size: 13px; color: rgba(255,255,255,0.45);">Phone: +91 89994 27831</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 20px 40px; border-top: 1px solid rgba(255,255,255,0.06);">
              <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.2); text-align: center;">
                ${new Date().getFullYear()} AEXOZON. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

    await transporter.sendMail({
      from: `"AEXOZON" <${process.env.SMTP_EMAIL}>`,
      to: toEmail,
      subject: `Booking Confirmed — #${bookingId} | AEXOZON`,
      html,
    });

    console.log(`Chatbot booking email sent to ${toEmail} (Booking #${bookingId})`);
  } catch (error) {
    console.error('Failed to send chatbot booking email:', error.message);
  }
};

export default {
  sendAutoReplyEmail,
  sendAdminNotification,
  sendChatbotBookingEmail,
};
