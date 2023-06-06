const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkAdmin = async (req, res, next) => {
  const user = jwt.decode(req.cookies.jwt);
  const loggedUser = await User.findOne({ username: user.username });

  if (user && loggedUser.isAdmin) {
    return next();
  }
  return res.status(403).send("You are not allowed to do that");
};

module.exports = checkAdmin;
