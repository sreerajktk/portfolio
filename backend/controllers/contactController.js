const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit a contact form inquiry
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  try {
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send email alert in background (non-blocking)
    const emailSubject = `New Portfolio Inquiry from: ${name} - ${subject}`;
    const emailHtml = `
      <h3>New Portfolio Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #4f46e5;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <br>
      <hr>
      <p style="font-size: 0.85em; color: #666;">This message was generated automatically from your portfolio portal.</p>
    `;

    sendEmail({
      to: 'sreerajk8@gmail.com', // Sreeraj's main inbox
      subject: emailSubject,
      html: emailHtml,
    }).catch(err => console.error('Background sendEmail caught error:', err));

    res.status(201).json({
      success: true,
      message: 'Your message has been received successfully. Thank you!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact read/unread status
// @route   PUT /api/contact/:id
// @access  Private
const updateContactStatus = async (req, res, next) => {
  const { status } = req.body;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    if (status && !['Read', 'Unread'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    contact.status = status || contact.status;
    await contact.save();

    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact submission
// @route   DELETE /api/contact/:id
// @access  Private
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    await contact.deleteOne();
    res.json({ success: true, message: 'Message removed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
};
