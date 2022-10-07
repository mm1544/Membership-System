// Here are all 'controller' functions used in Routes

// To generate JSON Web Tokens
const jsonWebToken = require('jsonwebtoken')

// To hash the password
const bcrypt = require('bcryptjs')

//Will need it because Mongoose will return a Promise therefore I need to deal with “async/await”. “Express-async-handler” is handling exceptions inside of async express routes and passing them to express error handler.
const asyncHandler = require('express-async-handler')

// Importing User model to be used for database
const User = require('../models/userModel')

// To create JSON Web Token
const createJWToken = (id) => {
  return jsonWebToken.sign({ id }, process.env.JWT_SECRET, {
    // expiresIn: '2h',
    expiresIn: '0.1h',
  })
}

// Description: To register new User
// Route: /api/users
// Route Access: Public
const registerUser = asyncHandler(async (req, res) => {
  // Destrucutring Request's Body
  const {
    name,
    email,
    password,
    wallet,
    mobileNumber,
    employeeId,
    cardNumber,
  } = req.body

  // Field validation
  if (!name) {
    // 400 Bad Request – This means that client-side input fails validation.
    res.status(400)
    throw new Error('Name is missing')
  } else if (!email) {
    res.status(400)
    throw new Error('Email is missing')
  } else if (!password) {
    res.status(400)
    throw new Error('Password is missing')
  }

  //   Find user by the email
  const currentUser = await User.findOne({ email })

  //   If User is found
  if (currentUser) {
    // 400 Bad Request – This means that client-side input fails validation.
    res.status(400)
    throw new Error('User already exists')
  }

  //   If User doesn't exist - hash the password. Returns promise therefore need to use 'await'.
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Creating User on database
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    wallet,
    mobileNumber,
    employeeId,
    cardNumber,
  })

  if (user) {
    // Sending data back
    // The HTTP 201 Created success status response code indicates that the request has succeeded and has led to the creation of a resource.
    res.status(201).json({
      // '_id' - is a syntax convention in MongoDB
      _id: user._id,
      name: user.name,
      email: user.email,
      token: createJWToken(user._id),
      cardNumber: user.cardNumber,
      wallet: user.wallet,
      employeeId: user.employeeId,
      mobileNumber: user.mobileNumber,
    })
  } else {
    res.status(400)
    throw new error('There was an error while creating a User.')
  }
})

// Description: To Login
// Route: /api/users/login
// Route Access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  // Comparing password from Request body and user password on Database.
  if (user && (await bcrypt.compare(password, user.password))) {
    // The HTTP 200 OK success status response code indicates that the request has succeeded.
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: createJWToken(user._id),
      mobileNumber: user.mobileNumber,
      employeeId: user.employeeId,
      wallet: user.wallet,
      cardNumber: user.cardNumber,
    })
  } else {
    // 401 Unauthorized response status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.
    res.status(401)
    throw new Error('Invalid login credentials')
  }
})

// Description: Get User by its ID
// Route: /api/users/:id
// Route Access: Restricted access to Admin
const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(401)
    throw new Error('User not found')
  }
})

// Description: To get currently logged in User
// Route: /api/users/me
// Route Access: Private
const getCurrentUser = asyncHandler(async (req, res) => {
  // Getting the User by the ID. User is added to 'req' object because I have set it in 'protector' middleware
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    mobileNumber: req.user.mobileNumber,
    employeeId: req.user.employeeId,
    wallet: req.user.wallet,
    cardNumber: req.user.cardNumber,
  }

  res.status(200).json(user)
})

// Description: Delete User
// Route: DELETE /api/users/:id
// Route Access: Restricted access to Admin
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    await user.remove()

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(401)
    throw new Error(`${error}`)
  }
})

// Description: Update User
// Route: PUT /api/users/:id
// Route Access: Restricted access to Admin
const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(401)
    throw new Error(`${error}`)
  }
})

// Description: Top-up money account
// Route: PUT /api/users/:id/top-up
// Route Access: Restricted access to Admin
const topUp = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }
    newAmount = Number(user.wallet) + Number(req.body.wallet)
    req.body.wallet = newAmount

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(401)
    throw new Error(`${error}`)
  }
})

// Description: Pay money
// Route: PUT /api/users/me/pay
// Route Access: Restricted access to Admin
const pay = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    if (Number(user.wallet) < Number(req.body.wallet)) {
      res.status(401)
      throw new Error('Not sufficient funds')
    }

    newAmount = Number(user.wallet) - Number(req.body.wallet)
    req.body.wallet = newAmount

    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    })

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(401)
    throw new Error(`${error}`)
  }
})

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  getCurrentUser,
  updateUser,
  deleteUser,
  topUp,
  pay,
}

// TO DO: Will add data to the http request's Body to send when register and login routes are trigered.
