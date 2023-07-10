require("dotenv").config();
const methodOverride = require("method-override");
const generalRouter = require("./routers/general/router");
const authRouter = require("./routers/auth/router");
const adminRouter = require("./routers/admin/router");
const userRouter = require("./routers/user/router");

const connectDB = require("./db");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use("/", generalRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  res.status(404).render("error/404.ejs");
});

connectDB();

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error);
});
