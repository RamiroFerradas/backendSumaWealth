const { Flights, Airline } = require("../../../db");
const { Op } = require("sequelize");
const e = require("express");

const ERROR = "Error @ Controllers/Flights";

// GET (ONE) FLIGHT BY ID
const getFligthsById = async (id) => {
  try {
    let flight_ID = await Flights.findOne({
      where: { id },
    });
    if (flight_ID) {
      const airlineID = await Airline.findOne({
        where: { iata_code: flight_ID.airline },
      });

      if (airlineID) {
        flight_ID = {
          ...flight_ID.dataValues,
          airline: {
            iata_code: airlineID.iata_code,
            name: airlineID.airline,
          },
        };
      }

      return flight_ID;
    } else {
      console.log(`No se encontraron vuelos con el ID: ${id}`);
      return `No se encontraron vuelos con el ID: ${id}`;
    }
  } catch (e) {
    console.error(`${ERROR}, getAirportByName --→ ${e}`);
    return e.message;
  }
};

// GET (ALL) FLIGHTS BY FLIGHT NUMBER
const getFligthsByNumber = async (flight_number) => {
  try {
    let flight = await Flights.findAll({
      where: { FLIGHT_NUMBER: flight_number },
    });
    if (flight) {
      return flight;
    } else {
      console.log(
        `No se encontraron vuelos con flight_number: ${flight_number}`
      );
      return `No se encontraron vuelos con flight_number: ${flight_number}`;
    }
  } catch (e) {
    console.error(`${ERROR}, getFligthsByNumber --→ ${e.message}`);
    return e.message;
  }
};

// GET (ALL) FLIGHTS BY TAIL NUMBER
const getFligthsByTailNumber = async (tail_number) => {
  try {
    let flight = await Flights.findAll({
      where: { TAIL_NUMBER: { [Op.iLike]: `%${tail_number}%` } },
    });

    if (flight.length) {
      return flight;
    } else {
      console.log(
        `No se encontraron vuelos con el numero de cola: ${tail_number}`
      );
      return `No se encontraron vuelos con el numero de cola: ${tail_number}`;
    }
  } catch (e) {
    console.error(`${ERROR}, getFligthsByTailNumber --→ ${e}`);
    return e.message;
  }
};

module.exports = { getFligthsById, getFligthsByNumber, getFligthsByTailNumber };
