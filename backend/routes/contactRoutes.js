const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');
const { contactValidation } = require('../validation/validators');

// Public route to submit contact inquiries
router.post('/', contactValidation, submitContact);

// Protected routes to manage contacts inbox
router.get('/', protect, getContacts);
router.put('/:id', protect, updateContactStatus);
router.delete('/:id', protect, deleteContact);

module.exports = router;
