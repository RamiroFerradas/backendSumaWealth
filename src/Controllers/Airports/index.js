const { Airport, Airline } = require("../../db");
const { Op } = require("sequelize");
const { airports } = require("../../Json/airports.json");

const ERROR = "Error @ Controllers/Airports";

// SAVE DB (ALL) AIRPORTS
const jsonAirports = async () => {
  try {
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
    console.log("✔ Aeropuertos cargados ------------");
    return "✔ Aeropuertos cargados.";
  } catch (e) {
    console.error(`${ERROR}, jsonAirports --→ ${e}`);
  }
};

// GET (ALL) AIRPORTS
const getAirports = async () => {
  try {
    const airport = await Airport.findAll({ order: ["airport"] });
    return airport;
  } catch (e) {
    console.error(`${ERROR}, getAirports --→ ${e}`);
  }
};

// GET (ONE) AIRPORTS BY ID
const getAirportsById = async (id) => {
  try {
    const airportId = await Airport.findOne({
      where: { id },
    });
    return airportId;
  } catch (e) {
    console.error(`${ERROR}, getAirportByName --→ ${e}`);
  }
};

// GET (ONE) AIRPORTS BY NAME
const getAirportsByName = async (name) => {
  console.log(name);

  try {
    const airportName = await Airport.findOne({
      where: { airport: { [Op.iLike]: `%${name}%` } },
    });
    return airportName;
  } catch (e) {
    console.error(`${ERROR}, getAirportByName --→ ${e}`);
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
      throw new Error("El aeropuerto ya existe");
    } else {
      return "Aeropuerto creado correctamente";
    }
  } catch (e) {
    console.error(`${ERROR}, postAirport --→ ${e}`);
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
  } catch (e) {
    console.error(`${ERROR}, putAirport --→ ${e}`);
  }
};

// DELETE (ONE) AIRPORT BY ID

const deleteAirport = async (id) => {
  const airportId = await Airport.findOne({
    where: { id },
  });

  try {
    await Airline.destroy({
      where: { id },
    });
    console.log(`Aeropuerto '${airportId.airport}' borrado con exito`);
    return `Aeropuerto '${airportId.airport}' borrado con exito`;
  } catch (e) {
    console.error(`${ERROR}, deleteAirport --→ ${e}`);
  }
};

module.exports = {
  getAirports,
  jsonAirports,
  getAirportsByName,
  getAirportsById,
  postAirport,
  modifyAirport,
  deleteAirport,
};
