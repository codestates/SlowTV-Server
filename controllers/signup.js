const { Users } = require("../models");

module.exports = {
  post: async (req, res) => {
    const { nickname, email, password } = req.body;

    const [user, created] = await Users.findOrCreate({
      where: {
        email: email,
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
        nickname: user.nickname,
        email: user.email,
      });
    }
  },
};
