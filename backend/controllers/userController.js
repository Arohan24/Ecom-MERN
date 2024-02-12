const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const User=require("../models/userModels");

//Register User

exports.registerUser=catchAsyncError(async(req,res,next)=>{
    const{name,email,password}=req.body;
    const user=await User.create({
        name,email,password,
        avatar:{
            public_id:"This is a sample ID",
            url:"profilePicUrl",
        },
    })
    res.status(201).json({
        success:true,
        user,
    })
})