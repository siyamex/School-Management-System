const Notification = require('../models/Notification');

async function sendAlert(user_id, message) {
  const notification = new Notification({
    user_id,
    message
  });

  try {
    await notification.save();
  } catch (err) {
    console.error('Error sending alert:', err.message);
  }
}

module.exports = sendAlert;