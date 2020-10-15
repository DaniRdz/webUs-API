const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const Schema  = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

module.exports = mongoose.model("users", UserSchema);
