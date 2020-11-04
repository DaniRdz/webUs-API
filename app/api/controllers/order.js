const orderModel = require("../models/order");
const user = require("../models/users");

module.exports = {
  create: (req, res, next) => {
    const { shippingMethod, orderStatus, orderTime, user } = req.body;

    orderModel.create(
      { shippingMethod, orderStatus, orderTime, user },
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
        user.populate(
          orders,
          {
            path: "user",
            select: ["name", "address", "phone", "cartProducts"],
            populate: {
              path: "cartProducts",
              model: "cart",
              populate: {
                path: "items.productId",
                model: "products",
                select: "title price",
              },
            },
          },
          (err, orders) => {
            for (let order of orders) {
              const {
                _id,
                shippingMethod,
                orderStatus,
                orderTime,
                user,
              } = order;
              ordersList.push({
                _id,
                orderStatus,
                shippingMethod,
                orderTime,
                user,
              });
            }
            res.json({
              status: "success",
              message: "Order List",
              data: { orders: ordersList },
            });
          }
        );
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
  deleteById: (req, res, next) => {
    orderModel.findByIdAndDelete(req.params.orderId, (err) => {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "succes",
          message: "Order Deleted",
        });
      }
    });
  },
};
