// index.js
const axios = require('axios');
const nodemailer = require('nodemailer');

// Mock functions to simulate asynchronous operations
const fetchUserData = async (userId) => {
  // Simulate API call to fetch user data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ userId, email: 'user@example.com', name: 'John Doe' });
    }, 1000);
  });
};

const updateUserInDatabase = async (user) => {
  // Simulate database update
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...user, updated: true });
    }, 1000);
  });
};

const sendConfirmationEmail = async (email) => {
  // Simulate sending an email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-email-password'   // Replace with your email password
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Confirmation Email',
    text: 'Your data has been updated successfully!'
  };

  return transporter.sendMail(mailOptions);
};

// Main function to execute asynchronous tasks
const processUser = async (userId) => {
  try {
    // Fetch user data
    const user = await fetchUserData(userId);
    console.log('User data fetched:', user);

    // Update user data in the database
    const updatedUser = await updateUserInDatabase(user);
    console.log('User data updated:', updatedUser);

    // Send confirmation email
    await sendConfirmationEmail(updatedUser.email);
    console.log('Confirmation email sent.');

  } catch (error) {
    console.error('Error processing user:', error);
  }
};

// Call the main function
processUser(1);
