const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "airline",
    {
      iata_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      airline: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
