const express = require("express");
const router = express.Router();

const productController = require("../app/api/controllers/product");
const auth = require("../middlewares/validateUsers");

router.post("/", auth.validateUser, auth.isAdmin, productController.create);
router.get("/", productController.getAll);
router.get("/:productId", productController.getById);
router.put(
  "/:productId",
  auth.validateUser,
  auth.isAdmin,
  productController.updateById
);
router.delete(
  "/:productId",
  auth.validateUser,
  auth.isAdmin,
  productController.deleteById
);

module.exports = router;
