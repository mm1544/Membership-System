const express = require('express')
const router = express.Router()
// Importing controller functions
const { registerUser, loginUser } = require('../controllers/userControler')

// Register route
router.post('/', registerUser)

// Login route
router.post('/login', loginUser)

module.exports = router
