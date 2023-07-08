const authService = require("../../services/authService");

exports.register = async (req, res, next) => {
  console.log("inside register");

  const { username, password, email } = req.body;
  console.log("req body is ", req.body);

  const oldUser = await authService.getUserByUsername(username);

  if (oldUser) {
    const message = "user already exists";
    res.render("auth/register.ejs", { message: message });
  }

  if (password.length < 6) {
    const message = "password less than 6 characters";
    res.render("auth/register.ejs", { message: message });
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
    console.log(err);
    res.render("error/500");
  }
};
