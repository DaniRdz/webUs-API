const express = require("express");
const router = express.Router();

const cartController = require("../app/api/controllers/cart");

router.post("/add-to-cart", cartController.addToCart);
router.put("/cart-update/:cartId", cartController.updateCart);

module.exports = router;
