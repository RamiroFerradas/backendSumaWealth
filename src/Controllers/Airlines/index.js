const { Airport, Airline } = require("../../db");
const { Op } = require("sequelize");
const { airlines } = require("../../Json/airlines.json");

const ERROR = "Error @ Controllers/Airlines";

// SAVE DB (ALL) AIRLINES
const jsonAirlines = async () => {
  try {
    airlines.map(async (ele) => {
      Airline.findOrCreate({
        where: {
          airline: ele?.AIRLINE,
        },
        defaults: {
          iata_code: ele?.IATA_CODE,
        },
      });
    });
    console.log("✔ Aerolineas cargados ------------");
    return "✔ Aerolineas cargados.";
  } catch (e) {
    console.error(`${ERROR}jsonAirlines --→ ${e}`);
  }
};

// GET (ALL) AIRLINES
const getAirlines = async () => {
  try {
    const airline = await Airline.findAll();
    return airline;
  } catch (e) {
    console.error(`${ERROR}getAirlines --→ ${e}`);
  }
};

// GET (ONE) AIRLINE BY ID
const getAirlinesById = async (id) => {
  //

  try {
    const airlineID = await Airline.findOne({
      where: { id },
    });
    return airlineID;
    //
  } catch (e) {
    console.error(`${ERROR}getAirlinesByName --→ ${e}`);
  }
};

// GET (ONE) AIRLINE BY NAME
const getAirlinesName = async (name) => {
  try {
    const airlineName = await Airline.findOne({
      where: { airline: { [Op.iLike]: `%${name}%` } },
    });
    return airlineName;
    //
  } catch (e) {
    console.error(`${ERROR}getAirlinesByName --→ ${e}`);
  }
};

// POST (ONE) AIRLINE
const postAirline = async (data) => {
  console.log(data);
  try {
    let { iata_code, airline } = data;
    console.log(data);
    const [row, created] = await Airline.findOrCreate({
      where: {
        airline,
      },
      defaults: {
        iata_code,
      },
    });

    if (!created) {
      throw new Error("El aerolinea ya esxiste");
    } else {
      return "Aerolinea creado correctamente";
    }
  } catch (e) {
    console.error(`${ERROR}postAirline --→ ${e}`);
  }
};

module.exports = {
  jsonAirlines,
  getAirlines,
  getAirlinesById,
  getAirlinesName,
  postAirline,
};
