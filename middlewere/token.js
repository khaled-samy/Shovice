const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkCookie = (req) => {
  return req.cookies["jwt"];
};

const verifyAccessToken = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    token = req.headers["x-access-token"] || checkCookie(req) || null;
  }

  if (!token) {
    res.redirect("/api/auth/login");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyAccessToken;
