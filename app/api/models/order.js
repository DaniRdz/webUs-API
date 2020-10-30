const mongoose = require("mongoose");

const users = mongoose.model("users");

const { Schema } = mongoose;

const orderSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "users" },
  shippingMethod: { type: String, default: "" },
  orderStatus: { type: String, default: "wait" },
  orderTime: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("order", orderSchema);
