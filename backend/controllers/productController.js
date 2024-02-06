const Product=require("../models/productModels")

//Create Product
exports.createProduct=async (req,res,next) => {
  const product=await Product.createProduct(req.body);

  res.status(201).json({
    sucess:true,
    product
  })
}

exports.getAllProducts=(req,res) => {
  res.status(200).json({message:"Route is working Fine"})
}