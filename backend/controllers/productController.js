const Product = require("../models/productModels");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
// Get all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 24;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
    productsCount,
  });
});
//Get Product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
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

//Create New Product Review or Update Product Review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  //Checking if the user has already given a review to this product

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    review,
  });
});

//Get All Reviews
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("No product found with that ID", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Product  Review
exports.deleteProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  //Delete Review
  const reviews = product.reviews.filter(
    (r) => r._id.toString() !== req.query.reviewId.toString()
  );

  //Aggregate the remaining reviews to calculate the new ratings
  let avg = 0;
  if (reviews.length > 0) {
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
    const ratings = avg / reviews.length;
    numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(
      req.query.productId,
      { reviews, ratings, numOfReviews },
      { new: true, runValidators: true, useFindAndModify: false }
    );
  } else {
    // If there are no remaining reviews, set the ratings to the previous value
    await Product.findByIdAndUpdate(
      req.query.productId,
      { reviews, ratings: product.ratings, numOfReviews: product.numOfReviews },
      { new: true, runValidators: true, useFindAndModify: false }
    );
  }

  res.status(204).json({
    success: true,
    message: "review deleted",
  });
});