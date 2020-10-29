const express = require("express");
const router = express.Router();

const orderController = require("../app/api/controllers/order");

router.post("/", orderController.create);

module.exports = router;
