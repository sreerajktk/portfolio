const express = require('express');
const router = express.Router();
const {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');
const { skillValidation } = require('../validation/validators');

// Public route to fetch all skills
router.get('/', getSkills);

// Protected routes to manage skills
router.post('/', protect, skillValidation, createSkill);
router.put('/:id', protect, skillValidation, updateSkill);
router.delete('/:id', protect, deleteSkill);

module.exports = router;
