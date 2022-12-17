const { User } = require("../models");

class UserController {
  async Registration(req, res) {
    let status;
    let message;
    let dtUser;
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      level: req.body.level,
    });
    dtUser = await user.save();
    if (dtUser) {
      status = 200;
      message = "Registration Success";
    } else {
      status = 401;
      message = "Registration Failed";
    }
    return res.status(200).json({ success: true, data: dtUser });
  }
  async Login(req, res) {
    let dtUser;
    let status;
    let message;
    let response;
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    dtUser = await User.findOne({ email: user.email }).exec();
    if (!dtUser) {
      status = 404;
      message = "User not found";
    } else {
      if (user.password != dtUser.password) {
        status = 401;
        message = "Wrong Password";
      } else {
        status = 200;
        message = "Login Success";
        response = {
          id: dtUser._id,
          name: dtUser.name,
          email: dtUser.email,
          level: dtUser.level,
          phone: dtUser.phone,
        };
      }
    }

    return res.status(status).json({ message: message, data: response });
  }
}
const userController = new UserController();
module.exports = userController;
