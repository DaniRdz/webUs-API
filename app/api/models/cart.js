const mongoose = require("mongoose");

const { Schema } = mongoose;

const itemSchema = new Schema({
  productId: { type: Schema.ObjectId, ref: "products" },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new Schema({
  items: [itemSchema],
  subtotal: { type: Number, default: 0 },
});

module.exports = mongoose.model("cart", cartSchema);
