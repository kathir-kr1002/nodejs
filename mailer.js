// mailer.js
const nodemailer = require('nodemailer');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password'   // Replace with your email password
  }
});

// Function to send an email
const sendReminderEmail = async () => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient@example.com', // Replace with recipient's email
    subject: 'Daily Reminder',
    text: 'This is your daily reminder email.'
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reminder email sent.');
  } catch (error) {
    console.error('Error sending reminder email:', error);
  }
};

module.exports = { sendReminderEmail };
