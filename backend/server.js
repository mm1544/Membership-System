const express = require('express')
// To be able to use Environmental variables. I will create .env file to store Evironmental variables
const dotenv = require('dotenv').config()
// Server port
const PORT = process.env.PORT

// Initialising app variable
const app = express()

// Creating Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Membership-System API' })
})

// Connecting to the routes placed in 'userRoutes.js'
app.use('/api/users', require('./routes/userRoutes'))

// Will start 'listening' on specific port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
