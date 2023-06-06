const express = require("express");
const router = express.Router();
const { login } = require("./routes/login");
const { register } = require("./routes/register");
const User = require("../models/user");

// const verifyAccessToken = require("../middlewere/token");
// const checkSeller = require("../middlewere/checkSeller");
// const checkUser = require("../middlewere/checkUser");

router.route("/register").post(register);
router.route("/register").get((req, res) => res.render("auth/register.ejs"));
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json({ msg: users });
});
router.delete("/remove", async (req, res) => {
  await User.remove({});
  res.json({ massage: "deleted successfull" });
});

router
  .route("/login")
  .get((req, res) => res.render("auth/login.ejs"))
  .post(login, (req, res) => res.redirect("/"));
router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

// router.use(verifyAccessToken);
// router.use(checkSeller);
// router.use(checkUser);

module.exports = router;
