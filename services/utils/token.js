const jwt = require("jsonwebtoken");

exports.getToken = (username, expirationTime) => {
  const token = jwt.sign({ username }, process.env.TOKEN_KEY, {
    expiresIn: expirationTime,
  });

  return token;
};
