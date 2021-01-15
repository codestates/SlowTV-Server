const { User } = require("../models");

module.exports = {
  post: async (req, res) => {
    const { nickname, email, password } = req.body;

    const [user, created] = await User.findOrCreate({
      where: {
        nickname: nickname,
      },
      defaults: {
        nickname,
        email,
        password,
      },
    });

    if (!created) {
      res.status(409).json({
        message: "exists message",
      });
    } else {
      res.status(201).json({
        nickname: nickname,
        email: email,
      });
    }
  },
};
