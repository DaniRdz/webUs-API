const mongoose = require("mongoose");

const mongoDB = "mongodb://localhost/webUs";

mongoose
  .connect(mongoDB)
  .then((db) => console.log("DB Connected"))

  .catch((err) => console.log(err));

module.exports = mongoose;
