const express = require('express');
const router = express.Router();
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { projectValidation } = require('../validation/validators');

// Public route to fetch all projects
router.get('/', getProjects);

// Protected routes to manage projects
router.post('/', protect, projectValidation, createProject);
router.put('/:id', protect, projectValidation, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
