const AuditLog = require('../models/AuditLog');

const auditLogger = (action) => {
  return async (req, res, next) => {
    try {
      const log = new AuditLog({
        user: req.user._id,
        action: action,
        details: JSON.stringify({
          method: req.method,
          url: req.originalUrl,
          body: req.body,
          params: req.params
        })
      });
      await log.save();
    } catch (err) {
      console.error('Error logging audit data:', err.message);
    }
    next();
  };
};

module.exports = auditLogger;