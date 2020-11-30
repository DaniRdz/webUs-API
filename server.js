const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config({ path: ".env" });

const users = require("./routes/users");
const products = require("./routes/product");
const orders = require("./routes/order");
const cart = require("./routes/cart");
const mongoose = require("./config/database");

const app = express();
const PORT = process.env.PORT || 8080;
const host = process.env.host || "0.0.0.0";

mongoose.connection.on(
  "error",
  console.error.bind(console, "Connection error in MongoDB")
);

app.use(express.json());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ Menssage: "Hello My beautiful Friends" });
});

app.use("/users", users);
app.use("/products", products);
app.use("/orders", orders);
app.use("/cart", cart);

app.listen(PORT, host, () => {
  console.log("Server is listennig on PORT:", PORT);
});
