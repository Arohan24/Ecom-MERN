
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt =require( "jsonwebtoken") ;
const User=require( '../models/userModels') 
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  let token;

  // Check if the token exists in cookies or headers
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    // Extract token from the Authorization header
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token){
    return next(new ErrorHandler("Please login to access this route", 401))
  }
  const decodedData=jwt.verify(token , process.env.JWT_SECRET );
  req.user= await User.findById(decodedData.id);
  next();
});