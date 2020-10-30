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
  getAll: (req, res, next) => {
    let ordersList = [];
    orderModel.find({}, (err, orders) => {
      if (err) {
        next(err);
      } else {
        for (let order of orders) {
          const { _id, shippingMethod, orderStatus, orderTime } = order;
          ordersList.push({
            _id,
            orderStatus,
            shippingMethod,
            orderTime,
          });
        }
        res.json({
          status: "success",
          message: "Order List",
          data: { orders: ordersList },
        });
      }
    });
  },
  updateById: (req, res, next) => {
    const { orderStatus } = req.body;
    orderModel.findByIdAndUpdate(
      req.params.orderId,
      { orderStatus },
      (err, orderInfo) => {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "success",
            message: "Status Updated",
            data: null,
          });
        }
      }
    );
  },
};
