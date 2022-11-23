const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "airline",
    {
      iata_code: {
        type: DataTypes.STRING,
      },
      airline: {
        type: DataTypes.STRING,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
