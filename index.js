require("dotenv").config();
const jwt = require("jsonwebtoken");
const methodOverride = require("method-override");
const authRouter = require("./auth/router");
const adminRouter = require("./routers/admin/router");
const userRouter = require("./routers/user/router");
const sessionExplorerRouter = require("./session-explorer/router");
const User = require("./models/user");
const Product = require("./models/product");
const Cart = require("./models/cart");

const connectDB = require("./db");
const express = require("express");
const cookieParser = require("cookie-parser");
const checkAdmin = require("./middlewere/checkAdmin");

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  try {
    const products = (await Product.find().sort()).reverse();
    if (req.cookies.jwt) {
      const user = jwt.decode(req.cookies.jwt);
      const loggedUser = await User.findOne({ username: user.username });
      const carts = await Cart.find({ userId: loggedUser._id });
      if (carts) {
        res.render("index.ejs", {
          user: loggedUser,
          products: products,
          cart: carts,
        });
      } else {
        res.render("index.ejs", {
          user: loggedUser,
          products: products,
          cart: "",
        });
      }
    }
    res.render("index.ejs", { user: "", products: products });
  } catch (err) {
    res.json(err);
  }
});

app.get("/:templete", async (req, res) => {
  const { templete } = req.params;
  if (templete !== "first") {
    const products = (await Product.find().sort()).reverse();
    if (req.cookies.jwt) {
      const user = jwt.decode(req.cookies.jwt);
      const loggedUser = await User.findOne({ username: user.username });
      const carts = await Cart.find({ userId: loggedUser._id });
      if (carts) {
        res.render("product/category.ejs", {
          user: loggedUser,
          products: products,
          cart: carts,
          templete: templete,
        });
      } else {
        res.render("product/category.ejs", {
          user: loggedUser,
          products: products,
          cart: "",
          templete: templete,
        });
      }
    }
    res.render("product/category.ejs", {
      user: "",
      cart: "",
      templete: templete,
      products: products,
    });
  } else {
    res.redirect("/");
  }
});

app.post("/", async (req, res) => {
  const { category } = req.body;
  if (category) {
    const products = (
      await Product.find({ category: category }).sort()
    ).reverse();
    if (req.cookies.jwt) {
      const user = jwt.decode(req.cookies.jwt);
      const loggedUser = await User.findOne({ username: user.username });
      const carts = await Cart.find({ userId: loggedUser._id });
      if (carts) {
        res.render("index.ejs", {
          user: loggedUser,
          products: products,
          cart: carts,
        });
      } else {
        res.render("index.ejs", {
          user: loggedUser,
          products: products,
          cart: "",
        });
      }
    }
    res.render("index.ejs", { user: "", products: products });
  }
});

app.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (req.cookies.jwt) {
    const user = jwt.decode(req.cookies.jwt);
    const loggedUser = await User.findOne({ username: user.username });
    if (product == null) res.redirect("/");
    res.render("product/show", { user: loggedUser, product: product });
  }
  res.render("product/show", { user: "", product: product });
});

app.get("/product", checkAdmin, (req, res) => res.send("Your products!"));
app.use("/test", (req, res) => res.send("from test!"));
app.use("/api", sessionExplorerRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/user", userRouter);

connectDB();

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error);
});
