// Database connection file

// Mongoose - ODM (Object Data Modelling) library to work with MongoDB database
const mongoose = require('mongoose')

const connectToMongoDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_DB_URI)
    // 'colors' package allows to style output of the console with ".red.bgYellow"
    console.log(
      `Connected to MongoDB: ${connection.connection.host}`.red.bgYellow
    )
  } catch (error) {
    console.log(`Error: ${error.message}`.bgRed.bold)
    // To exit the process with failure
    process.exit(1)
  }
}

module.exports = connectToMongoDB
