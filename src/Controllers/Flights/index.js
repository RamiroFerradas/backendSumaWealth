const { Flights, Airline } = require("../../db");
const { Op } = require("sequelize");
const e = require("express");

const ERROR = "Error @ Controllers/Flights";

// GET (ALL) FLIGHTS

const getFlights = async (page) => {
  const inicio = () => {
    if (!page || page == 0 || page >= 5820) {
      return 0;
    } else {
      return page * 1000 - 1;
    }
  };

  try {
    const { count, rows } = await Flights.findAndCountAll({
      offset: inicio(),
      limit: 1000,
      order: ["id"],
    });

    const res = rows.map((e) => e.dataValues);

    return res;
  } catch (e) {
    console.error(`${ERROR}, getFlights --→ ${e}`);
  }
};

// GET (ONE) FLIGHT BY ID
const getFligthsById = async (id) => {
  try {
    let flight_ID = await Flights.findOne({
      where: { id },
    });

    const airlineID = (
      await Airline.findOne({
        where: { iata_code: flight_ID.airline },
      })
    ).dataValues;

    flight_ID = {
      ...flight_ID.dataValues,
      airline: {
        iata_code: airlineID.iata_code,
        name: airlineID.airline,
      },
    };

    return flight_ID;
  } catch (e) {
    console.error(`${ERROR}, getAirportByName --→ ${e}`);
  }
};

// GET (ONE) FLIGHTS BY NAME
const getAirportsByName = async (name) => {
  try {
    const airportName = await Flights.findOne({
      where: { airport: { [Op.iLike]: `%${name}%` } },
    });
    return airportName;
  } catch (e) {
    console.error(`${ERROR}getAirportByName --→ ${e}`);
  }
};

module.exports = { getFlights, getFligthsById };
