const express = require('express')
// To be able to use Environmental variables. I will create .env file to store Evironmental variables
const dotenv = require('dotenv').config()
// Server port
const PORT = process.env.PORT
// Custom Error handler for Routes
const { errorHandler } = require('./middleware/errorHandler')

// Initialising app variable
const app = express()

// It will allow to send 'raw' JSON. It will parse http request's Body
app.use(express.json())

// To accept URL encoded form
app.use(express.urlencoded({ extended: false }))

// Creating Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Membership-System API' })
})

// Connecting to the routes placed in 'userRoutes.js'
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

// Will start 'listening' on specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
