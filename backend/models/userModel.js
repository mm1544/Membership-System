// Schema for database User
// const { Double } = require('bson')
const mongoose = require('mongoose')

// Shema will is taking-in an object of fields
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Add a name'],
    },
    email: {
      type: String,
      required: [true, 'Add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Add a password'],
    },
    wallet: {
      // type: Double,
      type: Number,
      required: false,
      // Initially wallet is empty
      default: 0.0,
    },
  },
  {
    // Timestamps will be added automatically
    timestamps: true,
  }
)

// Passing-in model name and model schema object
module.exports = mongoose.model('User', userSchema)
