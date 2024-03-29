const mongoose = require("mongoose");

let OrderSchema = new mongoose.Schema({
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true, default: "India" },
    pinCode: { type: Number, required: true },
    phoneNo: { type: Number, required: true },
  },
  orderItems: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: { type: String, required: true },
    status: { type: String, required: true },
  },
  paidAt: { type: Date, required: true },
  itemPrice: { type: Number, required: true ,default :0},
  taxPrice: { type: Number, required: true ,default :0},
  shippingPrice: { type: Number, required: true ,default :0},
  totalPrice: { type: Number, required: true ,default :0},
  orderStatus:{
    type:String,
    required:true,
    default:"processing"
    },
  deliveredAt:Date,
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("Order", OrderSchema);
