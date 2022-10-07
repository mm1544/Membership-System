const express = require('express')
const router = express.Router()
// Importing controller functions
const {
  registerUser,
  loginUser,
  getUserById,
  getCurrentUser,
  updateUser,
  deleteUser,
  topUp,
  pay,
} = require('../controllers/userControler')

const { protector, adminRestricted } = require('../middleware/authHandler')

// Register route
router.post('/', registerUser)

// Login route
router.post('/login', loginUser)

// Pay
router.put('/me/pay', protector, pay)

// Route to get currently logged in User
// To make a route 'protected' (private) adding middleware 'protector' as a second argument
router.get('/me', protector, getCurrentUser)

// Top up money account
router.put('/:id/top-up', adminRestricted, topUp)

// Get User by ID
router.get('/:id', adminRestricted, getUserById)

// Delete User
router.delete('/:id', adminRestricted, deleteUser)

// Update User
router.put('/:id', adminRestricted, updateUser)

module.exports = router
