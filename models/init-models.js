var DataTypes = require("sequelize").DataTypes;
var _Categories = require("./Categories");
var _Contents = require("./Contents");
var _Users = require("./Users");
var _UsersCategories = require("./UsersCategories");
var _UsersContents = require("./UsersContents");

function initModels(sequelize) {
  var Categories = _Categories(sequelize, DataTypes);
  var Contents = _Contents(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var UsersCategories = _UsersCategories(sequelize, DataTypes);
  var UsersContents = _UsersContents(sequelize, DataTypes);

  Contents.belongsTo(Categories, { foreignKey: "Categories_id"});
  Categories.hasMany(Contents, { foreignKey: "Categories_id"});
  UsersCategories.belongsTo(Categories, { foreignKey: "Categories_id"});
  Categories.hasMany(UsersCategories, { foreignKey: "Categories_id"});
  UsersCategories.belongsTo(Users, { foreignKey: "Users_id"});
  Users.hasMany(UsersCategories, { foreignKey: "Users_id"});
  UsersContents.belongsTo(Contents, { foreignKey: "Content_id"});
  Contents.hasMany(UsersContents, { foreignKey: "Content_id"});
  UsersContents.belongsTo(Users, { foreignKey: "User_id"});
  Users.hasMany(UsersContents, { foreignKey: "User_id"});

  return {
    Categories,
    Contents,
    Users,
    UsersCategories,
    UsersContents,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
