module.exports = {
  post: (req, res) => {
    if (!req.session.id) {
      res.status(400).json({
        message: "Not authorized",
      });
    } else {
      req.session.destroy();
      res.status(205).json({
        message: "Logout completed",
      });
    }
  },
};
