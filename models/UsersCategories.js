const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UsersCategories', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    Categories_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'UsersCategories',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_UserCategories_Users1_idx",
        using: "BTREE",
        fields: [
          { name: "Users_id" },
        ]
      },
      {
        name: "fk_UserCategories_Categories1_idx",
        using: "BTREE",
        fields: [
          { name: "Categories_id" },
        ]
      },
    ]
  });
};
