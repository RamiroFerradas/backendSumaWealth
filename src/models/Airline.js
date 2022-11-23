const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "airline",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
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
