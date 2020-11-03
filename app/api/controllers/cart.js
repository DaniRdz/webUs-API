const cartModel = require("../models/cart");

module.exports = {
  addToCart: (req, res, next) => {
    const { items } = req.body;
    cartModel.create({ items }, (err, result) => {
      if (err) {
        next(err);
      } else {
        res.json({ status: "succes", message: "item added" });
      }
    });
  },
};
