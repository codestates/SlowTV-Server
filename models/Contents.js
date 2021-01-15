const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Contents",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      contentname: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      contentlink: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Categories_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "Contents",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_Contents_Categories1_idx",
          using: "BTREE",
          fields: [{ name: "Categories_id" }],
        },
      ],
    }
  );
};
