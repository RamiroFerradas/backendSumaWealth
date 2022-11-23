const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "airport",
    {
      iata_code: {
        type: DataTypes.STRING,
      },
      airport: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      latitude: {
        type: DataTypes.FLOAT,
      },
      longitude: {
        type: DataTypes.FLOAT,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
