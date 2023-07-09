const User = require("../models/user");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const utils = require("./utils/token");

exports.getUserByUsername = async (username) => {
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

  const newUser = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
    token: token,
  });

  return { newUser, token, maxAge };
};

exports.loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    return { user: null, validPassword: false, token: null, maxAge: null };
  }
  const validPassword = await bcrypt.compare(password, user.password);
  const maxAge = 2 * 60 * 60;
  const token = utils.getToken(username, maxAge);
  const { isAdmin } = user;

  user.token = token;

  await user.save();

  return { user, validPassword, token, maxAge, isAdmin };
};
