const { Airport, Airline } = require("../../db");
const { Op } = require("sequelize");
const { airports } = require("../../Json/airports.json");

const ERROR = "Error @ Controllers/Airports";

// SAVE DB (ALL) AIRPORTS
const jsonAirports = async () => {
  try {
    const airportsDB = await Airport.findAll();

    if (!airportsDB.length) {
      airports.map(async (ele) => {
        Airport.findOrCreate({
          where: {
            airport: ele?.AIRPORT,
          },
          defaults: {
            iata_code: ele?.IATA_CODE,
            city: ele?.CITY,
            state: ele?.STATE,
            country: ele?.COUNTRY,
            latitude: ele.LATITUDE ? ele.LATITUDE : 0,
            longitude: ele.LONGITUDE ? ele.LONGITUDE : 0,
          },
        });
      });
      await Airport.count();
      console.log(
        `✔ Aeropuertos cargados ------------> ${await Airport.count()}`
      );
    }
  } catch (e) {
    console.error(`${ERROR}, jsonAirports --→ ${e}`);
  }
};

// GET (ALL) AIRPORTS
const getAirports = async () => {
  try {
    const airport = await Airport.findAll({ order: ["airport"] });
    if (airport.length) {
      console.log(`Se encontraron ${airport.length} aeropuertos`);
      return airport;
    } else {
      return "No se encontraron aeropuertos";
    }
  } catch (e) {
    console.error(`${ERROR}, getAirports --→ ${e}`);
    return e.message;
  }
};

// POST (ONE) AIRPORTS
const postAirport = async (data) => {
  try {
    let { iata_code, airport, city, state, country, latitude, longitude } =
      data;

    const [row, created] = await Airport.findOrCreate({
      where: {
        airport,
      },
      defaults: {
        iata_code,
        city,
        state,
        country,
        latitude,
        longitude,
      },
    });

    if (!created) {
      return `El aeropuerto '${airport}' ya existe`;
    } else {
      const airportId = await Airport.findOne({
        where: { airport },
      });
      return `Aeropuerto '${airport}' creado correctamente con el ID: ${airportId.id}`;
    }
  } catch (e) {
    console.error(`${ERROR}, postAirport --→ ${e}`);
    return e.message;
  }
};

// PUT (ONE) AIRPORTS BY ID

const modifyAirport = async (id, data) => {
  try {
    let { iata_code, airport, city, state, country, latitude, longitude } =
      data;

    const airportId = await Airport.findOne({
      where: { id },
    });

    if (airportId) {
      await Airport.update(
        {
          iata_code,
          city,
          state,
          country,
          latitude,
          longitude,
          airport,
        },

        {
          where: {
            id,
          },
        }
      );
      return `Aeropuerto '${airportId.airport}' modificado con éxito.`;
    } else {
      return `No se encontro aeropuerto con el ID: ${id}`;
    }
  } catch (e) {
    console.error(`${ERROR}, putAirport --→ ${e}`);
    return e.message;
  }
};

// DELETE (ONE) AIRPORT BY ID

const deleteAirport = async (id) => {
  try {
    const airportId = await Airport.findOne({
      where: { id },
    });
    if (airportId) {
      await Airport.destroy({
        where: { id },
      });
      console.log(`Aeropuerto '${airportId.airport}' borrado con exito`);
      return `Aeropuerto '${airportId.airport}' borrado con exito`;
    } else {
      return "El aeropuerto ya fue eliminado";
    }
  } catch (e) {
    console.error(`${ERROR}, deleteAirport --→ ${e}`);
    return e.message;
  }
};

module.exports = {
  getAirports,
  jsonAirports,
  postAirport,
  modifyAirport,
  deleteAirport,
};
