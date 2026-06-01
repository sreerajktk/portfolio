const mongoose = require('mongoose');

const checkDbConnection = (req, res, next) => {
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database Offline: The Node server is active, but cannot establish connection to MongoDB. Please start your local MongoDB daemon (e.g. run "brew services start mongodb-community" or start the MongoDB service) or paste your remote MongoDB Atlas connection URI inside backend/.env.',
    });
  }
  next();
};

module.exports = { checkDbConnection };
