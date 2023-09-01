// authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/auth');
router.post('/register', register);
router.post('/login', login);

module.exports = router;
