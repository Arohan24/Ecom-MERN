const express=require("express");

const { getAllProducts ,createProduct, updateProduct, deleteProduct, getOneProduct, createProductReview} = require("../controllers/productController");
const {isAuthenticatedUser, authorizeRole}=require("../middleware/auth");

const router=express.Router();
//Get All Products Route
router.route("/products").get(getAllProducts)
//Create a new product route (Admin Only)
router.route("/product/new").post(isAuthenticatedUser,authorizeRole("admin"),createProduct)
//Update an existing product route (Admin only)
router.route("/product/:id").put(isAuthenticatedUser,authorizeRole("admin"),updateProduct)
//Delete a product route (Admin Only)
router.route("/product/:id").delete(isAuthenticatedUser,authorizeRole("admin"),deleteProduct)
//Get Single Product route
router.route("/product/:id").get(getOneProduct);
//Create or update a review on a single product route
router.route("/product/customer/review").put(isAuthenticatedUser,createProductReview);
 
module.exports=router