const { Flights, Airline } = require("../../db");
const { Op } = require("sequelize");
const e = require("express");

const ERROR = "Error @ Controllers/Flights";

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
      return rows;
    } else {
      console.log("No se encontraron vuelos");
      return "No se encontraron vuelos";
    }
  } catch (e) {
    console.error(`${ERROR}, getFlights --→ ${e}`);
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

    const updateFlight = await Flights.create({
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

    if (updateFlight) {
      console.log(`Se creo el vuelo correctamente`);
      return updateFlight;
    } else {
      return "No se pudo crear el vuelo, vuelve a intentarlo";
    }
  } catch (e) {
    console.error(`${ERROR}, postFlight --→ ${e}`);
  }
};

// MODIFY (ONE) FLIGHT
const modifyFlight = async (id, data) => {
  console.log(data);
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
  } catch (e) {
    console.error(`${ERROR}, modifyFlight --→ ${e}`);
  }
};

const deleteFlight = async (id) => {
  try {
    await Flights.destroy({
      where: { id },
    });
    console.log(`Vuelo id: '${id}' borado con exito`);
    return `Vuelo id: '${id}' borado con exito`;
  } catch (e) {
    console.error(`${ERROR}, deleteFlight --→ ${e}`);
  }
};
module.exports = { getFlights, postFlight, modifyFlight, deleteFlight };
