const Order = require("../models/orderModels");
const Product = require("../models/productModels");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");

//Creating new  order
exports.createOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    paymentInfo,
    orderItems,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    paymentInfo,
    orderItems,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: order,
  });
});

//Get order Details
exports.getOrderDetails = catchAsyncError(async (req, res, next) => {
  const orders = await Order.findById(req.params.id)
    .populate("user", "name email")
    .exec();

  //Checking if the order exists or not
  if (!orders)
    return next(new ErrorHandler(`No order with id ${req.params.id}`, 404));

  res.status(200).json({
    success: true,
    data: orders,
  });
});

//Get Single user orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    data: orders,
  });
});

//Get all Orders (Admin)
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount=0;
  orders.forEach((order)=>{
     totalAmount += order.totalPrice
  });

  res.status(200).json({
    success: true,
    count: orders.length,
    totalAmount: totalAmount,
    data: orders,
  });
});

//Update Order Status (Admin)
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if(!order || order.length===0){
    return next( new ErrorHandler('No such order found',404))
  }

  if(order.orderStatus === "Delivered"){
    return next(new ErrorHandler("You have already delivered this  order",400));
  }

  order.orderItems.forEach(async o=> {
      await updateStock(o.productId, o.quantity);
  })

  order.orderStatus=req.body.status;

  if(req.body.status==="Delivered"){
    order.deliveredAt=Date.now();
  }
  await order.save({validateBeforeSave : false});


  res.status(200).json({
    success: true,
  }); 
});
 
//Delete Orders (Admin)
exports.deleteOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  
  if(!order || order.length===0){
    return next( new ErrorHandler('No such order found',404))
  }
  await order.deleteOne();
  
  res.status(200).json({
    success: true,
    count: order.length,
    data: order,
  });
});

async  function updateStock(product, quantity){
   const products=await Product.findById(product);
   if (!products) {
    throw new ErrorHandler("Product not found", 404);
  }
   products.Stock-=quantity;
   await products.save({validateBeforeSave:false});
} 