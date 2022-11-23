const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "flights",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
        primaryKey: true,
      },
      year: {
        type: DataTypes.INTEGER,
      },
      month: {
        type: DataTypes.INTEGER,
      },
      day: {
        type: DataTypes.INTEGER,
      },
      day_of_week: {
        type: DataTypes.INTEGER,
      },
      airline: {
        type: DataTypes.STRING,
      },
      flight_number: {
        type: DataTypes.INTEGER,
      },
      tail_number: {
        type: DataTypes.STRING,
      },
      origin_airport: {
        type: DataTypes.STRING,
      },
      destination_airport: {
        type: DataTypes.STRING,
      },
      scheduled_departure: {
        type: DataTypes.STRING,
      },
      departure_time: {
        type: DataTypes.INTEGER,
      },
      departure_delay: {
        type: DataTypes.INTEGER,
      },
      taxi_out: {
        type: DataTypes.INTEGER,
      },
      wheels_off: {
        type: DataTypes.STRING,
      },
      scheduled_time: {
        type: DataTypes.INTEGER,
      },
      elapsed_time: {
        type: DataTypes.INTEGER,
      },
      air_time: {
        type: DataTypes.INTEGER,
      },
      distance: {
        type: DataTypes.INTEGER,
      },
      wheels_on: {
        type: DataTypes.STRING,
      },
      taxi_in: {
        type: DataTypes.INTEGER,
      },
      scheduled_arrival: {
        type: DataTypes.STRING,
      },
      arrival_time: {
        type: DataTypes.STRING,
      },
      arrival_delay: {
        type: DataTypes.INTEGER,
      },
      diverted: {
        type: DataTypes.INTEGER,
      },
      cancelled: {
        type: DataTypes.INTEGER,
      },
      cancelation_reason: {
        type: DataTypes.STRING,
      },
      air_system_delay: {
        type: DataTypes.STRING,
      },
      security_delay: {
        type: DataTypes.STRING,
      },
      airline_delay: {
        type: DataTypes.STRING,
      },
      late_aircraft_delay: {
        type: DataTypes.STRING,
      },
      weather_delay: {
        type: DataTypes.STRING,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
