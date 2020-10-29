const orderModel = require("../models/order");

module.exports = {
  create: (req, res, next) => {
    const { shippingMethod, orderStatus, orderTime } = req.body;

    orderModel.create(
      { shippingMethod, orderStatus, orderTime },
      (err, result) => {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "seccess",
            message: "order Added Succesfully!!!",
            data: null,
          });
        }
      }
    );
  },
};
