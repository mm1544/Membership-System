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
    // PIN code
    password: {
      type: String,
      required: [true, 'Add a 4 digit long PIN code'],
      // maxLength: 4,
      // minLength: 4,
    },

    mobileNumber: {
      type: Number,
      required: [true, 'Add an mobile number'],
    },

    // unique employee ID
    employeeId: {
      type: Number,
      required: [true, 'Add unique emplyee ID'],
      unique: true,
    },

    // Card number
    cardNumber: {
      type: String,
      required: [true, 'Add 16 characters long card number'],
      unique: true,
      maxLength: 16,
      minLength: 16,
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
