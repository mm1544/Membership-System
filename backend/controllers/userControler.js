// Here are all 'controller' functions used in Routes

//Will need it because Mongoose will return a Promise therefore I need to deal with “async/await”. “Express-async-handler” is handling exceptions inside of async express routes and passing them to express error handler.
const asyncHandler = require('express-async-handler')

// Description: To register new User
// Route: /api/users
// Route Access: Public
const registerUser = asyncHandler(async (req, res) => {
  // Destrucutring Request's Body
  const { name, email, password } = req.body

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

  res.send('Register Route')
})

// Description: To Login
// Route: /api/users/login
// Route Access: Public
const loginUser = asyncHandler(async (req, res) => {
  res.send('Login Route')
})

module.exports = {
  registerUser,
  loginUser,
}

// TO DO: Will add data to the http request's Body to send when register and login routes are trigered.
