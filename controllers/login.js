const { User } = require("../models");

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user) {
      res.status(400).json({
        message: "Not authorized",
      });
    } else {
      req.session.id = email;
      res.status(200).json({
        message: "OK",
      });
    }
  },
};
