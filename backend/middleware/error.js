const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

// Mongoose CastError: Invalid ObjectId
if (err.name === "CastError") {
  const message = `Resource not found. Invalid ${err.path}: ${err.value}`;
  error = new ErrorHandler(message, 404);
}

// Mongoose Validation Error
if (err.name === "ValidationError") {
  const message = Object.values(err.errors).map((value) => value.message);
  error = new ErrorHandler(message, 400);
}

// Mongoose Document Not Found Error
if (err.name === "DocumentNotFoundError") {
  const message = "Resource not found. Please verify your request and try again.";
  error = new ErrorHandler(message, 404);
}

// Mongoose Connection Error
if (err.name === "MongoNetworkError") {
  const message = "MongoDB connection error. Please check your network connection and try again.";
  error = new ErrorHandler(message, 500);
}
  
// Handle other MongoDB errors
if (err.name === "MongoError") {
  if (err.code === 11000) { // Duplicate key error
    const message = "Duplicate key error. The resource already exists.";
    error = new ErrorHandler(message, 400);
  } else {
    const message = "MongoDB Error. Please contact the administrator for assistance.";
    error = new ErrorHandler(message, 500);
  }
}

res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};