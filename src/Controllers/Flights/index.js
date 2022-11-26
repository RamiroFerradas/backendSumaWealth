const { Flights, Airline } = require("../../db");
const { Op } = require("sequelize");
const e = require("express");
// const flightFile = require("../../Controllers/Flights/flights.csv");

const ERROR = "Error @ Controllers/Flights";

const path = require("path");
const nReadlines = require("n-readlines");

const fillDB = require("./fillDB");
const flightsSeed = new nReadlines(
  path.join(__dirname.replace("routes", "../seeders"), "flights.csv")
);

// SAVE DB (ALL) AIRPORTS
const FlifgthsDb = async () => {
  try {
    const fligthscount = await Flights.count();
    for (let i = 0; i < 5000; i++) {
      await fillDB(flightsSeed, Flights, 1000);
      await Flights.count();
    }

    console.log("✔ Vuelos cargados ------------");
    return "✔ Vuelos cargados.";
  } catch (e) {
    console.error(`${ERROR}, getFlights --→ ${e.message}`);
    return e.message;
  }
};
// GET (ALL) FLIGHTS

const getFlights = async (page) => {
  try {
    const inicio = () => {
      if (!page || page == 0) return 0;
      else return page * 1000 - 1;
    };
    const { count, rows } = await Flights.findAndCountAll({
      offset: inicio(),
      limit: 1000,
      order: ["id"],
    });

    if (rows.length) {
      console.log(`Vuelos encontrados:`, count);
      console.log(
        `Mostrando vuelos en la pagina ${page ? page : 1} /`,
        Math.floor(count / 1000)
      );
      return rows;
    } else {
      console.log("No se encontraron vuelos");
      return "No se encontraron vuelos";
    }
  } catch (e) {
    console.error(`${ERROR}, getFlights --→ ${e}`);
    return e.message;
  }
};

// POST (ONE) FLIGHT
const postFlight = async (data) => {
  try {
    let {
      YEAR,
      MONTH,
      DAY,
      DAY_OF_WEEK,
      AIRLINE,
      FLIGHT_NUMBER,
      TAIL_NUMBER,
      ORIGIN_AIRPORT,
      DESTINATION_AIRPORT,
      SCHEDULED_DEPARTURE,
      DEPARTURE_TIME,
      DEPARTURE_DELAY,
      TAXI_OUT,
      WHEELS_OFF,
      SCHEDULED_TIME,
      ELAPSED_TIME,
      AIR_TIME,
      DISTANCE,
      WHEELS_ON,
      TAXI_IN,
      SCHEDULED_ARRIVAL,
      ARRIVAL_TIME,
      ARRIVAL_DELAY,
      DIVERTED,
      CANCELLED,
      CANCELLATION_REASON,
      AIR_SYSTEM_DELAY,
      SECURITY_DELAY,
      AIRLINE_DELAY,
      LATE_AIRCRAFT_DELAY,
      WEATHER_DELAY,
    } = data;

    const postFlight = await Flights.create({
      YEAR,
      MONTH,
      DAY,
      DAY_OF_WEEK,
      AIRLINE,
      FLIGHT_NUMBER,
      TAIL_NUMBER,
      ORIGIN_AIRPORT,
      DESTINATION_AIRPORT,
      SCHEDULED_DEPARTURE,
      DEPARTURE_TIME,
      DEPARTURE_DELAY,
      TAXI_OUT,
      WHEELS_OFF,
      SCHEDULED_TIME,
      ELAPSED_TIME,
      AIR_TIME,
      DISTANCE,
      WHEELS_ON,
      TAXI_IN,
      SCHEDULED_ARRIVAL,
      ARRIVAL_TIME,
      ARRIVAL_DELAY,
      DIVERTED,
      CANCELLED,
      CANCELLATION_REASON,
      AIR_SYSTEM_DELAY,
      SECURITY_DELAY,
      AIRLINE_DELAY,
      LATE_AIRCRAFT_DELAY,
      WEATHER_DELAY,
    });

    if (postFlight) {
      console.log(`Se creo el vuelo correctamente con el ID: ${postFlight.id}`);
      return postFlight;
    } else {
      return "No se pudo crear el vuelo, vuelve a intentarlo";
    }
  } catch (e) {
    console.error(`${ERROR}, postFlight --→ ${e}`);
    return e.message;
  }
};

// MODIFY (ONE) FLIGHT
const modifyFlight = async (id, data) => {
  try {
    let {
      YEAR,
      MONTH,
      DAY,
      DAY_OF_WEEK,
      AIRLINE,
      FLIGHT_NUMBER,
      TAIL_NUMBER,
      ORIGIN_AIRPORT,
      DESTINATION_AIRPORT,
      SCHEDULED_DEPARTURE,
      DEPARTURE_TIME,
      DEPARTURE_DELAY,
      TAXI_OUT,
      WHEELS_OFF,
      SCHEDULED_TIME,
      ELAPSED_TIME,
      AIR_TIME,
      DISTANCE,
      WHEELS_ON,
      TAXI_IN,
      SCHEDULED_ARRIVAL,
      ARRIVAL_TIME,
      ARRIVAL_DELAY,
      DIVERTED,
      CANCELLED,
      CANCELLATION_REASON,
      AIR_SYSTEM_DELAY,
      SECURITY_DELAY,
      AIRLINE_DELAY,
      LATE_AIRCRAFT_DELAY,
      WEATHER_DELAY,
    } = data;

    const updateFlight = await Flights.update(
      {
        YEAR,
        MONTH,
        DAY,
        DAY_OF_WEEK,
        AIRLINE,
        FLIGHT_NUMBER,
        TAIL_NUMBER,
        ORIGIN_AIRPORT,
        DESTINATION_AIRPORT,
        SCHEDULED_DEPARTURE,
        DEPARTURE_TIME,
        DEPARTURE_DELAY,
        TAXI_OUT,
        WHEELS_OFF,
        SCHEDULED_TIME,
        ELAPSED_TIME,
        AIR_TIME,
        DISTANCE,
        WHEELS_ON,
        TAXI_IN,
        SCHEDULED_ARRIVAL,
        ARRIVAL_TIME,
        ARRIVAL_DELAY,
        DIVERTED,
        CANCELLED,
        CANCELLATION_REASON,
        AIR_SYSTEM_DELAY,
        SECURITY_DELAY,
        AIRLINE_DELAY,
        LATE_AIRCRAFT_DELAY,
        WEATHER_DELAY,
      },

      {
        where: {
          id,
        },
      }
    );

    if (updateFlight) {
      console.log(`Se actualizo el vuelo id: ${id} correctamente.`);
      return `Se actualizo el vuelo id: ${id} correctamente.`;
    } else {
      return "No se pudo actualizar el vuelo";
    }
  } catch (e) {
    console.error(`${ERROR}, modifyFlight --→ ${e}`);
    return e.message;
  }
};

const deleteFlight = async (id) => {
  try {
    const fligthId = await Flights.findOne({
      where: { id },
    });

    if (fligthId) {
      await Flights.destroy({
        where: { id },
      });
      console.log(`Vuelo id: '${id}' borado con exito`);
      return `Vuelo id: '${id}' borado con exito`;
    } else {
      return "El vuelo ya fue borrado";
    }
  } catch (e) {
    console.error(`${ERROR}, deleteFlight --→ ${e}`);
    return e.message;
  }
};
module.exports = {
  getFlights,
  postFlight,
  modifyFlight,
  deleteFlight,
  FlifgthsDb,
};
