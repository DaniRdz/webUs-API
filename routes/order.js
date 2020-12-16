const express = require("express");
const router = express.Router();

const auth = require("../middlewares/validateUsers");

const orderController = require("../app/api/controllers/order");

router.post("/", orderController.create);
router.get("/", orderController.getAll);
router.put(
  "/:orderId",
  auth.validateUser,
  auth.isAdmin,
  orderController.updateById
);
router.delete(
  "/:orderId",
  auth.validateUser,
  auth.isAdmin,
  orderController.deleteById
);

module.exports = router;
