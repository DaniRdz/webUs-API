const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../../../config/config");

module.exports = {
  create: function (req, res, next) {
    const { name, email, password } = req.body;
    userModel.create({ name, email, password }, function (err, result) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "ok",
          message: "user created successfully!!",
          data: null,
        });
      }
    });
  },
  authenticate: function (req, res, next) {
    userModel.findOne({ email: req.body.email }, function (err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign({ id: userInfo._id }, config.SECRET, {
            expiresIn: "1h",
          });
          res.json({
            status: "ok",
            message: "user has been authenticated!",
            data: { user: userInfo, token: token },
          });
        } else {
          res.json({ status: "error", message: "Invalid email/password!!" });
        }
      }
    });
  },
};
