const express = require("express");
const router = express.Router();

const productController = require("../app/api/controllers/product");

router.get("/", productController.getAll);
router.post("/", productController.create);

module.exports = router;
