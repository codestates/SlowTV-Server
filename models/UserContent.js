const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserContent', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    User_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    Content_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Content',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'UserContent',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "User_id" },
          { name: "Content_id" },
        ]
      },
      {
        name: "fk_UserContent_User_idx",
        using: "BTREE",
        fields: [
          { name: "User_id" },
        ]
      },
      {
        name: "fk_UserContent_Content1_idx",
        using: "BTREE",
        fields: [
          { name: "Content_id" },
        ]
      },
    ]
  });
};
