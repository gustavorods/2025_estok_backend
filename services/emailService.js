require('dotenv').config();
const nodemailer = require('nodemailer');


// SMTP server configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true if using port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Function to send email
async function sendEmail(to, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: `Estok <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log(`✅ Email successfully sent: ${info.messageId}`);

    return { 
      status: true, 
      message: 'Email successfully sent.' 
    };

  } catch (error) {
    console.error(`❌ Failed to send email: ${error.message}`);

    return { 
      status: false, 
      message: 'Failed to send email.', 
      error: error.message 
    };
  }
}

module.exports = sendEmail;
