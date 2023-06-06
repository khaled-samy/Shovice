const User = require("../models/user");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const utils = require("./utils/token");

exports.getUserByUsername = async (username) => {
  console.log("inside authService");
  return await User.findOne({ username });
};

exports.getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.registerUser = async (username, password, email) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const maxAge = 2 * 60 * 60;
  const token = utils.getToken(username, maxAge);
  console.log({ token });

  const newUser = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
    token: token,
  });

  console.log("making USER after token b4 cookie----");
  console.log({ newUser });

  return { newUser, token, maxAge };
};

exports.loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  const validPassword = await bcrypt.compare(password, user.password);
  const maxAge = 2 * 60 * 60;
  const token = utils.getToken(username, maxAge);

  user.token = token;

  await user.save();

  console.log({ token });

  return { user, validPassword, token, maxAge };
};
