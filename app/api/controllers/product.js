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
  getById: (req, res, next) => {
    productModel.findById(req.params.productId, (err, productInfo) => {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "product found",
          data: { product: productInfo },
        });
      }
    });
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
  updateById: (req, res, next) => {
    const { title, description, price } = req.body;
    productModel.findByIdAndUpdate(
      req.params.productId,
      { title, description, price },
      (err, productInfo) => {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "success",
            message: "product Updated",
            data: null,
          });
        }
      }
    );
  },
  deleteById: (req, res, next) => {
    productModel.findByIdAndDelete(req.params.productId, (err, productInfo) => {
      if (err) {
        next(err);
      } else {
        res.json({ status: "succes", message: "Product Deleted" });
      }
    });
  },
};
