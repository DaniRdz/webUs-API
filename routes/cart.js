const express = require("express");
const router = express.Router();

const cartController = require("../app/api/controllers/cart");

router.post("/add-to-cart", cartController.addToCart);

module.exports = router;
