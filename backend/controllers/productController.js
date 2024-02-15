const Product = require("../models/productModels");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
// Get all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 2;
  const productCount=Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
  });
});
//Get Product details
exports.getOneProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});

// Create Product
exports.createProduct = catchAsyncError(async (req, res, next) => { 
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Find one and Update By ID
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
    product: product,
  });
});
