
const cron = require('node-cron');
const { sendReminderEmail } = require('./mailer');

cron.schedule('0 8 * * *', () => {
  console.log('Running daily cron job...');
  sendReminderEmail();
}, {
  scheduled: true,
  timezone: "America/New_York"
});

console.log('Cron job scheduled. It will run daily at 8 AM.');
