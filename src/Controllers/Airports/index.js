const { Airport, Airline } = require("../../db");
const { Op } = require("sequelize");
const { airports } = require("../../Json/airports.json");

const ERROR = "Error @ Controllers/Airports";

// SAVE DB (ALL) AIRPORTS
const jsonAirports = async () => {
  //
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
    //
  } catch (e) {
    console.error(`${ERROR}jsonAirports --→ ${e}`);
  }
};

// GET (ALL) AIRPORTS
const getAirports = async () => {
  //
  try {
    const airport = await Airport.findAll();
    return airport;
    //
  } catch (e) {
    console.error(`${ERROR}getAirports --→ ${e}`);
  }
};

// GET (ONE) AIRPORTS BY NAME
const getAirportsById = async (id) => {
  //

  try {
    const airportId = await Airport.findOne({
      where: { id },
    });
    return airportId;
    //
  } catch (e) {
    console.error(`${ERROR}getAirportByName --→ ${e}`);
  }
};

const getAirportsByName = async (name) => {
  console.log(name);

  try {
    const airportName = await Airport.findOne({
      where: { airport: { [Op.iLike]: `%${name}%` } },
    });
    return airportName;
    //
  } catch (e) {
    console.error(`${ERROR}getAirportByName --→ ${e}`);
  }
};

module.exports = {
  getAirports,
  jsonAirports,
  getAirportsByName,
  getAirportsById,
};
