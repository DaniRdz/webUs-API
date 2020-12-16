const orderModel = require("../models/order");
const users = require("../models/users");
const carts = require("../models/cart");

module.exports = {
  create: (req, res, next) => {
    const { shippingMethod, orderStatus, orderTime, user } = req.body;

    users.populate(
      user,
      { path: "_id", select: "_id name phone address cartProducts" },
      () => {
        const { _id, name, phone, address, cartProducts } = user._id;
        orderModel.create(
          {
            shippingMethod,
            orderStatus,
            orderTime,
            user: { _id, name, phone, address, cartProducts },
          },
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
      }
    );
  },
  getAll: (req, res, next) => {
    let ordersList = [];
    orderModel.find({}, (err, orders) => {
      if (err) {
        next(err);
      } else {
        carts.populate(
          orders,
          {
            path: "user.cartProducts",
            select: "items subtotal",
            populate: {
              path: "items.product",
              model: "products",
              select: "title price",
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
              ordersList.unshift({
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
              orders: ordersList,
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
