const { body, validationResult } = require('express-validator');

// Error handling middleware helper for validation results
const validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({ field: err.path, message: err.msg })),
    });
  }
  next();
};

// Admin Login Validation
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validateResults
];

// Project creation/update validation
const projectValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Project title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Project description is required'),
  body('techStack')
    .isArray({ min: 1 })
    .withMessage('Tech stack must be an array and contain at least one skill tag'),
  body('image')
    .trim()
    .notEmpty()
    .withMessage('Project image URL or path is required'),
  body('category')
    .notEmpty()
    .withMessage('Project category is required')
    .isIn(['Full Stack', 'CRM', 'E-commerce', 'Portfolio', 'Mobile App', 'API-based', 'Other'])
    .withMessage('Invalid project category'),
  body('githubUrl')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('GitHub URL must be a valid link'),
  body('liveUrl')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Live demo URL must be a valid link'),
  validateResults
];

// Skill creation/update validation
const skillValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Skill name is required')
    .isLength({ max: 50 })
    .withMessage('Skill name cannot exceed 50 characters'),
  body('category')
    .notEmpty()
    .withMessage('Skill category is required')
    .isIn(['Technical', 'Soft'])
    .withMessage('Category must be either Technical or Soft'),
  body('proficiency')
    .isNumeric()
    .withMessage('Proficiency must be a number')
    .isInt({ min: 0, max: 100 })
    .withMessage('Proficiency must be an integer between 0 and 100'),
  body('icon')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Icon identifier cannot be empty'),
  validateResults
];

// Contact form message submission validation
const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Your name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ max: 100 })
    .withMessage('Subject cannot exceed 100 characters'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message text is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  validateResults
];

module.exports = {
  loginValidation,
  projectValidation,
  skillValidation,
  contactValidation,
};
