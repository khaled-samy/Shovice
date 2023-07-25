const Message = require("../../../models/message");

exports.addMessage = async (req, res) => {
  let newMessage = new Message(req.body);
  res.redirect("/api/admin/message");
  try {
    newMessage = await newMessage.save();
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
