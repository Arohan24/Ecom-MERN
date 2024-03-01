const express=require("express");

const {} = require("../controllers/productController");
const {isAuthenticatedUser, authorizeRole}=require("../middleware/auth");
const { createOrder, getOrderDetails, myOrders, updateOrderStatus, deleteOrders, getAllOrders }=require("../controllers/orderController")
const router=express.Router();


//Create new Order Route
router.route("/order/new").post(isAuthenticatedUser, createOrder);
//Get all Orders Route 
router.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
//Get User Orders Route
router.route("/orders/my").get(isAuthenticatedUser, myOrders);
//Get all Orders Admin Route
router.route('/admin/orders/all').get(isAuthenticatedUser, authorizeRole('admin'), getAllOrders);
//Update Order Status Admin Route
router.route("/admin/orders/updateStatus/:id").put(isAuthenticatedUser,authorizeRole('admin'), updateOrderStatus)
//Delete Order Admin Route
router.route( "/admin/orders/delete/:id" ).delete( isAuthenticatedUser , authorizeRole('admin') , deleteOrders );
module.exports=router;