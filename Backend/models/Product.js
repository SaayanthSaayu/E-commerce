const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productname: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: String, required: true },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Product",productSchema);