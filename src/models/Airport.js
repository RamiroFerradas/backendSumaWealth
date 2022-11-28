const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "airport",
    {
      iata_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      airport: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
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
