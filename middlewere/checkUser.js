const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkUser = async (req, res, next) => {
  const user = req.cookies.jwt;

  if (user) {
    next();
  } else {
    res.redirect("api/auth/login");
  }
};

module.exports = checkUser;
