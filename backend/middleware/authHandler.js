const jsonWebToken = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// Function to restrict access to Admin
const adminRestricted = asyncHandler(async (req, res, next) => {
  // Check if ADMIN_KEY is in the header.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Will split into array where word 'Bearer' is the first item and Token is the second item
      autorizationAdminKey = req.headers.authorization.split(' ')[1]

      if (process.env.ADMIN_KEY == autorizationAdminKey) {
        //   To call next middleware
        next()
      } else {
        // 401 - unauthorized
        res.status(401)
        throw new Error('Not authorized')
      }
    } catch (error) {
      console.log(error)
      // 401 - unauthorized
      res.status(401)
      throw new Error('Not authorized')
    }
  }
})

// Function to protect Routes
const protector = asyncHandler(async (req, res, next) => {
  let jWToken

  // Check for the token in the headers. Token will be stored on the front-end.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Getting token from req header
      // Will split into array where word 'Bearer' is the first item and Token is the second item
      jWToken = req.headers.authorization.split(' ')[1]
      //   verifying the Token
      const decodedJWToken = jsonWebToken.verify(
        jWToken,
        process.env.JWT_SECRET
      )
      //   Getting User from token
      //   '-password' will exclude password from the data that is returned for this user
      req.user = await User.findById(decodedJWToken.id).select('-password')

      //   To call next middleware
      next()
    } catch (error) {
      console.log(error)
      // 401 - unauthorized
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  // Checking case when there is no token
  if (!jWToken) {
    // 401 - unauthorized
    res.status(401)
    throw new Error('Not authorized')
  }
})

module.exports = { protector, adminRestricted }
