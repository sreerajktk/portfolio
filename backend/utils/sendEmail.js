const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_USER || 'dummy_user',
      pass: process.env.SMTP_PASS || 'dummy_pass',
    },
  });

  // Setup email options
  const mailOptions = {
    from: process.env.SMTP_FROM || '"Portfolio Contact" <sreerajk8@gmail.com>',
    to: options.to || 'sreerajk8@gmail.com',
    subject: options.subject,
    html: options.html,
  };

  // Send message
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Nodemailer Error: ${error.message}`);
    // Do not rethrow the error so that database insertion doesn't roll back
    return null;
  }
};

module.exports = sendEmail;
