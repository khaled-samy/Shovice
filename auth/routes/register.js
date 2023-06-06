const authService = require("../../services/authService");

exports.register = async (req, res, next) => {
  console.log("inside register");

  const { username, password, email } = req.body;
  console.log("req body is ", req.body);

  const oldUser = await authService.getUserByUsername(username);

  console.log({ oldUser });
  if (oldUser) {
    return res.status(409).send("user already exists");
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "password less than 6 characters" });
  }

  try {
    const { newUser, token, maxAge } = await authService.registerUser(
      username,
      password,
      email
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    return res.redirect("/");
  } catch (err) {
    return res.status(401).json({
      message: "User not created",
      error: err.message,
    });
  }
};
