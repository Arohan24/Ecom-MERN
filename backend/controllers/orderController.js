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
  const orders = await Order.find(req.params.id);

  if(orders.orderStatus === "Delivered"){
    return next(new ErrorHandler("You have already delivered this  order",400));
  }

  order.orderItems.forEach(async order=> {
      await updateStock(order.product, order.quantity);
  })

  order.orderStatus=req.body.status;

  if(req.body.status==="Delivered"){
    order.deliveredAt=Date.now();
  }
  await order.save({validateBeforeSave : false});


  res.status(200).json({
    success: true,
    count: orders.length,
    totalAmount: totalAmount,
    data: orders,
  });
});

async  function updateStock(product, quantity){
   const product=await Product.findById(product);
   product.stock-=quantity;
   await product.save({validateBeforeSave:false});
}

//Delete Orders (Admin)
exports.deleteOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find(req.params.id);

  if(!orders || orders.length===0){
     return next( new ErrorHandler('No such order found',404))
  }
  await orders.remove();

  res.status(200).json({
    success: true,
    count: orders.length,
    totalAmount: totalAmount,
    data: orders,
  });
});
