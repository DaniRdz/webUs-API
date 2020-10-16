const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const users = require("./routes/users");
const products = require("./routes/product");
const mongoose = require("./config/database");

var jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

app.set("secretKey", "SecretKey");

mongoose.connection.on(
  "error",
  console.error.bind(console, "Error de conexion en MongoDB")
);

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ Menssage: "Hello My beautiful Friends" });
});

app.use("/users", users);

app.use("/products", products);

app.listen(PORT, () => {
  console.log("Server is listennig on PORT:", PORT);
});
