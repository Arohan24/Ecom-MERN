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
