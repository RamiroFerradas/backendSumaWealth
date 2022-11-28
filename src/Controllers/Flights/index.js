const { Flights } = require("../../db");
const { Op } = require("sequelize");
const e = require("express");
const path = require("path");
const nReadlines = require("n-readlines");

const ERROR = "Error @ Controllers/Flights";

const fillDB = require("./fillDB");
const flightsSeed = new nReadlines(
  path.join(__dirname.replace("routes", "../seeders"), "flights.csv")
);

// SAVE DB (ALL) AIRPORTS
const FlifgthsDb = async (cuantity) => {
  cuantity = cuantity ? cuantity : 5000;
  try {
    // const flightsCount = await Flights.findAll();
    // if (!flightsCount.length)
    fillDB(flightsSeed, Flights, cuantity).then(
      await Flights.count(),
      console.log(
        `✔ Vuelos cargados -----------------> ${await Flights.count()}`
      )
    );

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
      console.log(
        !page
          ? "No se encontraron vuelos"
          : `No se encontraron vuelos en la pagina ${page}`
      );
      return !page
        ? "No se encontraron vuelos"
        : `No se encontraron vuelos en la pagina ${page}`;
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
      year,
      month,
      day,
      day_of_week,
      airline,
      flight_number,
      tail_number,
      origin_airport,
      destination_airport,
      scheduled_departure,
      departure_time,
      departure_delay,
      taxi_out,
      wheels_off,
      scheduled_time,
      elapsed_time,
      air_time,
      distance,
      wheels_on,
      taxi_in,
      scheduled_arrival,
      arrival_time,
      arrival_delay,
      diverted,
      cancelled,
      cancellation_reason,
      air_system_delay,
      security_delay,
      airline_delay,
      late_aircraft_delay,
      weather_delay,
    } = data;

    const postFlight = await Flights.create({
      year,
      month,
      day,
      day_of_week,
      airline,
      flight_number,
      tail_number,
      origin_airport,
      destination_airport,
      scheduled_departure,
      departure_time,
      departure_delay,
      taxi_out,
      wheels_off,
      scheduled_time,
      elapsed_time,
      air_time,
      distance,
      wheels_on,
      taxi_in,
      scheduled_arrival,
      arrival_time,
      arrival_delay,
      diverted,
      cancelled,
      cancellation_reason,
      air_system_delay,
      security_delay,
      airline_delay,
      late_aircraft_delay,
      weather_delay,
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
      year,
      month,
      day,
      day_of_week,
      airline,
      flight_number,
      tail_number,
      origin_airport,
      destination_airport,
      scheduled_departure,
      departure_time,
      departure_delay,
      taxi_out,
      wheels_off,
      scheduled_time,
      elapsed_time,
      air_time,
      distance,
      wheels_on,
      taxi_in,
      scheduled_arrival,
      arrival_time,
      arrival_delay,
      diverted,
      cancelled,
      cancellation_reason,
      air_system_delay,
      security_delay,
      airline_delay,
      late_aircraft_delay,
      weather_delay,
    } = data;
    {
      const updateFlight = await Flights.update(
        {
          year,
          month,
          day,
          day_of_week,
          airline,
          flight_number,
          tail_number,
          origin_airport,
          destination_airport,
          scheduled_departure,
          departure_time,
          departure_delay,
          taxi_out,
          wheels_off,
          scheduled_time,
          elapsed_time,
          air_time,
          distance,
          wheels_on,
          taxi_in,
          scheduled_arrival,
          arrival_time,
          arrival_delay,
          diverted,
          cancelled,
          cancellation_reason,
          air_system_delay,
          security_delay,
          airline_delay,
          late_aircraft_delay,
          weather_delay,
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
