// Schema for database User
const mongoose = require('mongoose')

// Shema is taking-in an object of fields
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

    // Money account
    wallet: {
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
