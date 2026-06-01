const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { loginValidation } = require('../validation/validators');

// @route   POST /api/auth/login
router.post('/login', loginValidation, login);

module.exports = router;
