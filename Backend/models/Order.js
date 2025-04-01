const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 }
  }
],
  totalprice: { type: Number, required: true, min: 0 },
  orderdate: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
  
});


module.exports = mongoose.model("Order",orderSchema);