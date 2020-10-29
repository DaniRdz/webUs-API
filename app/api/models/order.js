const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  //userInfo: {},
  shippingMethod: { type: String, default: "" },
  orderStatus: { type: String, default: "wait" },
  orderTime: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("order", orderSchema);
