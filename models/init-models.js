var DataTypes = require("sequelize").DataTypes;
var _Content = require("./Content");
var _User = require("./User");
var _UserContent = require("./UserContent");

function initModels(sequelize) {
  var Content = _Content(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var UserContent = _UserContent(sequelize, DataTypes);

  User.belongsToMany(Content, { through: UserContent, foreignKey: "User_id", otherKey: "Content_id" });
  Content.belongsToMany(User, { through: UserContent, foreignKey: "Content_id", otherKey: "User_id" });
  UserContent.belongsTo(Content, { foreignKey: "Content_id"});
  Content.hasMany(UserContent, { foreignKey: "Content_id"});
  UserContent.belongsTo(User, { foreignKey: "User_id"});
  User.hasMany(UserContent, { foreignKey: "User_id"});

  return {
    Content,
    User,
    UserContent,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
