const productModel = require("../models/product");

module.exports = {
  create: (req, res, next) => {
    productModel.create(
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
      },
      (err, result) => {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "seccess",
            message: "Product Added Succesfully!!!",
            data: null,
          });
        }
      }
    );
  },
  getAll: (req, res, next) => {
    let productsList = [];
    productModel.find({}, (err, products) => {
      if (err) {
        next(err);
      } else {
        for (let product of products) {
          productsList.push({
            id: product._id,
            title: product.title,
            description: product.description,
            price: product.price,
          });
        }

        res.json({
          status: "success",
          message: "Product List",
          data: { products: productsList },
        });
      }
    });
  },
};
