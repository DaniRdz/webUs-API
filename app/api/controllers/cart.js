const cartModel = require("../models/cart");
const products = require("../models/product");

module.exports = {
  addToCart: (req, res, next) => {
    const { items } = req.body;
    products.populate(items, { path: "product", select: "price" }, () => {
      let subtotal = 0;

      for (var i = 0; i < items.length; i++) {
        subtotal += items[i].quantity * items[i].product.price;
      }

      cartModel.create({ items, subtotal }, (err, result) => {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "succes",
            message: "item added",
            cartId: result._id,
          });
        }
      });
    });
  },
  updateCart: (req, res, next) => {
    const { items } = req.body;
    products.populate(items, { path: "product", select: "price" }, () => {
      let subtotal = 0;

      for (var i = 0; i < items.length; i++) {
        subtotal += items[i].quantity * items[i].product.price;
      }

      cartModel.findByIdAndUpdate(
        req.params.cartId,
        { items, subtotal },
        (err, cartInfo) => {
          if (err) {
            next(err);
          } else {
            res.json({ status: "succes", message: "cart updated" });
          }
        }
      );
    });
  },
};
