const { Users } = require("../models");

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: {
        email: email,
        password: password,
      },
    });
    console.log("user.id : ", user.id);
    if (!user) {
      res.status(400).json({
        message: "Not authorized",
      });
    } else {
      req.session.userId = user.id;
      res.status(200).json({
        message: "OK",
      });
    }
  },
};
