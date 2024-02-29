const express=require("express");

const {} = require("../controllers/productController");
const {isAuthenticatedUser, authorizeRole}=require("../middleware/auth");
const { createOrder, getOrderDetails, myOrders, updateOrderStatus, deleteOrders }=require("../controllers/orderController")
const router=express.Router();


//Create new Order Route
router.route("/order/new").post(isAuthenticatedUser, createOrder);
//Get all Orders Route 
router.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
//Get User Orders Route
router.route("/orders/my").get(isAuthenticatedUser, myOrders);
//Get all Orders Admin Route
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRole('Admin'), getAllOrders);
//Update Order Status Admin Route
router.route("/admin/updateStatus").put(isAuthenticatedUser,authorizeRole('Admin'), updateOrderStatus)
//Delete Order Admin Route
router.route( "/admin/delete" ).delete( isAuthenticatedUser , authorizeRole('Admin') , deleteOrders );
module.exports=router;