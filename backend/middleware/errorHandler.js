const errorHandler = (err, req, res, next) => {
  // If statusCode is not set, then use statusCode to 500 (500 Internal server error – This is a generic server error.)
  const statusCode = res.statusCode ? res.statusCode : 500
  // Setting status on response
  res.status(statusCode)
  // Adding message and error stack to the response
  res.json({
    message: err.message,
    // Error stack is displayed only in Production
    stack: process.env.NODE_ENV == 'production' ? null : err.stack,
  })
}

module.exports = { errorHandler }
