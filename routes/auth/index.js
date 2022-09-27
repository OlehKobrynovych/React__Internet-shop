const login = require('./login')
const register = require('./register')

const express = require('express')
const router = express.Router()

// Register
router.post("/register", register);

// Login
router.post("/login", login);

module.exports = router