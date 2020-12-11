const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    _id: { type: Schema.ObjectId, ref: "users" },
    name: String,
    phone: String,
    address: String,
    cartProducts: { type: Schema.ObjectId, ref: "carts" },
  },
  shippingMethod: { type: String, default: "" },
  orderStatus: { type: String, default: "wait" },
  orderTime: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("order", orderSchema);
