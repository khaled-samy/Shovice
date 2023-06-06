const express = require("express");
const router = express.Router();
const verifyTokenMiddleware = require("../middlewere/token");

router.route("/cookie").get((req, res) => {
  console.log("cookies: ", req.cookies);
  res.status(200).json({
    cookies: req.cookies,
  });
});

router.route("/token").post(verifyTokenMiddleware, (req, res) => {
  res.status(200).send("token correct: access granted!");
});

module.exports = router;
