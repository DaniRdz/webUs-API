const jwt = require("jsonwebtoken");

const userModel = require("../app/api/models/users");

const config = require("../config/config");

module.exports = {
  validateUser: (req, res, next) => {
    jwt.verify(req.headers["x-access-token"], config.SECRET, (err, decoded) => {
      if (err) {
        res.json({ mesagge: "No token Provide" });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  },
  isAdmin: (req, res, next) => {
    userModel.findById(req.body.userId, (err, userInfo) => {
      if (err) {
        next(error);
      } else {
        if (userInfo.role === "admin") {
          next();
        } else {
          res.json({ mesagge: "you are not Admin" });
        }
      }
    });
  },
};
