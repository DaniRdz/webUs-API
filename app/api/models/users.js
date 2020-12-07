const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  address: { type: String, default: "" },
  phone: { type: String, default: "" },
  password: String,
  role: { type: String, default: "user" },
  cartProducts: { type: Schema.ObjectId, ref: "carts" },
});

UserSchema.pre("save", function (next) {
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

module.exports = mongoose.model("users", UserSchema);
