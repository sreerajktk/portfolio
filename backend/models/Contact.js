const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Sender name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Sender email address is required'],
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message text is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Unread', 'Read'],
      default: 'Unread',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);
