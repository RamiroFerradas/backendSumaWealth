const { Airport, Airline } = require("../../db");

const { airports } = require("../../Json/airports.json");

const ERROR = "Error @ Controllers/Airports";

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

module.exports = {
  getAirports,
  jsonAirports,
};
