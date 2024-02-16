const express=require("express");
const { registerUser, loginUser, logOut, forgotPassword, resetPassword, getUserDetails, updatePassword } = require("../controllers/userController");
const { isAuthenticatedUser ,authorizeRole} = require("../middleware/auth");
const router=express.Router();

//Create New User Route
router.route("/register").post(registerUser)
//Login  User Route
router.route("/login").post(loginUser)
//Forgot  Password Route
router.route("/password/forgot").post(forgotPassword)
//Reset  Password With Token Route
router.route("/password/reset/:token").put(resetPassword)
//Get  Current User Route
router.route("/me").get(isAuthenticatedUser,getUserDetails)
//Update User Password Route
router.route("/password/update").put(isAuthenticatedUser,updatePassword)
//Logout  User Route
router.route("/logout").post(logOut)
module.exports=router