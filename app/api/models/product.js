const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imgURL: String,
  belogsTo: [Number],
});

module.exports = mongoose.model("products", productSchema);
