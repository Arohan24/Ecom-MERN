const express=require("express");
const { registerUser, loginUser, logOut, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
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
//Update User  Profile Route
router.route("/me/update").put(isAuthenticatedUser,updateProfile)
//Logout  User Route
router.route("/logout").post(logOut)
//Get  All Users Route (Admin only)
router.route('/admin/users').get(isAuthenticatedUser, authorizeRole('admin'), getAllUsers);
//Get Single User Details (Admin only)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRole('admin'), getSingleUser);
//Update user Role (Admin only)
router.route("/admin/user/:id").put(isAuthenticatedUser, authorizeRole('admin'), updateUserRole);
//Delete user  (Admin only)
router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizeRole('admin'), deleteUser);

module.exports=router