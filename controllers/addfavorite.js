const { Contents, UsersContents } = require("../models");
module.exports = {
  post: async (req, res) => {
    const userId = req.session.userId;
    const { link } = req.body;
    if (!userId) {
      res.status(404).json({ message: "Not authorized" });
      // req.session.userId가 일치 하는 경우
    } else {
      const contentId = await Contents.findOne({
        attributes: ["id"],
        where: { contentlink: link },
      });
      //DB에 링크가 존재하지 않는 경우
      if (!contentId) {
        res.status(404).json({ message: "This link does not exist" });
        //링크가 존재하는 경우
      } else {
        const [usercontents, create] = await UsersContents.findOrCreate({
          where: {
            User_id: userId,
            Content_id: contentId.id,
          },
          defaults: {
            User_id: userId,
            Content_id: contentId.id,
          },
        });
        if (!create) {
          res.status(409).json({ message: "Link exists" });
        } else {
          res.status(200).send({
            message: "Ok",
          });
        }
      }
    }
  },
};
