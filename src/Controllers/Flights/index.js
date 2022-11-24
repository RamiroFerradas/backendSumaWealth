const { Flights } = require("../../db");
const { Op } = require("sequelize");

const ERROR = "Error @ Controllers/Flights";

// SAVE DB (ALL) AIRPORTS

// const FlightsDb = async () => {
//   try {
//     Flights.create({
//       year,
//       month,
//       day,
//       day_of_week,
//       airline,
//       flight_number,
//       tail_number,
//       origin_airport,
//       destination_airport,
//       scheduled_departure,
//       departure_time,
//       departure_delay,
//       taxi_out,
//       wheels_off,
//       scheduled_time,
//       elapsed_time,
//       air_time,
//       distance,
//       wheels_on,
//       taxi_in,
//       scheduled_arrival,
//       arrival_time,
//       arrival_delay,
//       diverted,
//       cancelled,
//       cancelation_reason,
//       air_system_delay,
//       security_delay,
//       airline_delay,
//       late_aircraft_delay,
//       weather_delay,
//     });
//     console.log("✔ Vuelos cargados ------------");
//     return "✔ Vuelos cargados.";
//   } catch (e) {
//     console.error(`${ERROR}jsonFlights --→ ${e}`);
//   }
// };

// GET (ALL) AIRPORTS

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

    const asd = rows.map((e) => e.dataValues);

    return asd;
  } catch (e) {
    console.error(`${ERROR}, getFlights --→ ${e}`);
  }
};

// GET (ONE) AIRPORTS BY ID
const getFligthsById = async (id) => {
  try {
    const airportId = await Flights.findOne({
      where: { id },
    });
    return airportId;
  } catch (e) {
    console.error(`${ERROR}getAirportByName --→ ${e}`);
  }
};

// GET (ONE) AIRPORTS BY NAME
const getAirportsByName = async (name) => {
  console.log(name);

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
