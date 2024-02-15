const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail");
//Register User

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is a sample ID",
      url: "profilePicUrl",
    },
  });
  sendToken(user,201,res);
});

//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //check if the user has given pasword and email
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email And Password", 400));
  }
  const user =await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const ispasswordMatched = await user.comparePassword(password);
  if (!ispasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user,200,res);
  
});

//Logout User
exports.logOut = catchAsyncError(async (req, res, next) => {
  res.cookie("token",null,{ 
   expires : new Date(Date.now()) ,httpOnly: true })

   res.status(200).json({
    success:true,
    message:"Logged out"
   });
})

//Forgot Password
exports.forgotPassword=catchAsyncError( async (req,res,next)=>{
  const email=req.body.email;
  const user=await User.findOne({email});
  if(!user){
    return next(new ErrorHandler('Email does not exist',404))
  }
  const resetToken=user.getResetPasswordToken();
  await user.save({validateBeforeSave:false});
  const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

  const message= `Following is your Reset Password link\n ${resetPasswordUrl}\n If you did not intend to reset your password, then ignore this email.`;

  try {
    await sendEmail({
      email:user.email,
      subject:'Ecommerce Password Recovery',
      message,
    });
    res.status(200).json({
      success:true,
      message:`Email has been sent to ${email}`
    });
  } catch (error) {
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save({validateBeforeSave: false});
    return next(new ErrorHandler(error.message,500));
  }
});
