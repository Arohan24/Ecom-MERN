
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt =require( "jsonwebtoken") ;
const User=require( '../models/userModels') 
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies?.token || req.header("Authorization").replace("Bearer ", "");
  if (!token){
    return next(new ErrorHandler("Please login to access this route", 401))
  }
  const decodedData=jwt.verify(token , process.env.JWT_SECRET );
  req.user= await User.findById(decodedData.id);
  next();
});