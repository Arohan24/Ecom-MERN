const express=require("express");

const {} = require("../controllers/productController");
const {isAuthenticatedUser, authorizeRole}=require("../middleware/auth");
const { createOrder, getOrderDetails, myOrders }=require("../controllers/orderController")
const router=express.Router();


//Create new Order Route
router.route("/order/new").post(isAuthenticatedUser,createOrder);
//Get all Orders Route (Admin only)
router.route("/orders/:id").get(isAuthenticatedUser,authorizeRole('admin'), getOrderDetails);
//Get User Orders Route
router.route("/orders/my").get(isAuthenticatedUser,authorizeRole('user', 'admin'),myOrders);


module.exports=router;