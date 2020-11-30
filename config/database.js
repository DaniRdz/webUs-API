const mongoose = require("mongoose");

require("dotenv").config({ path: ".env" });

const mongoDB = process.env.DB_URL;

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("DB Connected"))

  .catch((err) => console.log(err));

module.exports = mongoose;
