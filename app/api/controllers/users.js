const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../../../config/config");

module.exports = {
  create: function (req, res, next) {
    const { name, email, password, address, phone, cartProducts } = req.body;
    userModel.create(
      { name, email, password, address, phone, cartProducts },
      function (err, result) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "ok",
            message: "user created successfully!!",
            userInfo: result,
          });
        }
      }
    );
  },
  authenticate: function (req, res, next) {
    userModel.findOne({ email: req.body.email }, function (err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (userInfo == null) {
          res.json({ status: "error", message: "Invalid email/password!!" });
        } else {
          if (bcrypt.compareSync(req.body.password, userInfo.password)) {
            const token = jwt.sign({ id: userInfo._id }, config.SECRET, {
              expiresIn: "1h",
            });
            res.json({
              status: "ok",
              message: "user has been authenticated!",
              user: userInfo,
              token,
            });
          } else {
            res.json({ status: "error", message: "Invalid email/password!!" });
          }
        }
      }
    });
  },
  updateById: (req, res, next) => {
    const { address, phone, cartProducts } = req.body;
    userModel.findByIdAndUpdate(
      req.params.userId,
      { address, phone, cartProducts },
      (err, userInfo) => {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "success",
            message: "User Updated",
            user: { address, phone },
          });
        }
      }
    );
  },
};
