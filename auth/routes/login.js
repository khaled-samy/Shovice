const authService = require("../../services/authService");

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log("login req body is ", req.body);

  if (!username || !password) {
    return res.status(400).json({ message: "username or password is missing" });
  }

  try {
    const { user, validPassword, token, maxAge } = await authService.loginUser(
      username,
      password
    );
    if (!user) {
      return res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    }
    if (!validPassword) {
      return res.status(401).json({
        message: "Login not successful",
        error: "Password is incorrect",
      });
    }
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, //convert 2h to ms; maxAge uses miliseconds
    });

    return res.redirect("/");
  } catch (err) {
    res.status(401).json({
      message: "Login not successful",
      error: err.message,
    });
  }
};
