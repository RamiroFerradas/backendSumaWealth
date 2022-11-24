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
    console.error(`${ERROR}, jsonAirlines --→ ${e}`);
  }
};

// GET (ALL) AIRLINES
const getAirlines = async () => {
  try {
    const airline = await Airline.findAll({ order: ["airline"] });
    return airline;
  } catch (e) {
    console.error(`${ERROR}, getAirlines --→ ${e}`);
  }
};

// GET (ONE) AIRLINE BY ID
const getAirlinesById = async (id) => {
  try {
    const airlineID = await Airline.findOne({
      where: { id },
    });
    return airlineID;
  } catch (e) {
    console.error(`${ERROR}, getAirlinesByName --→ ${e}`);
  }
};

// GET (ONE) AIRLINE BY NAME
const getAirlinesName = async (name) => {
  try {
    const airlineName = await Airline.findOne({
      where: { airline: { [Op.iLike]: `%${name}%` } },
    });
    return airlineName;
  } catch (e) {
    console.error(`${ERROR}, getAirlinesByName --→ ${e}`);
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
      throw new Error("La aerolinea ya esxiste");
    } else {
      return "Aerolinea creada correctamente";
    }
  } catch (e) {
    console.error(`${ERROR}, postAirline --→ ${e}`);
  }
};

// PUT (ONE) AIRLINE BY ID

const modifyAirline = async (id, data) => {
  try {
    let { iata_code, airline } = data;

    const airlineId = (
      await Airline.findOne({
        where: { id },
      })
    ).dataValues;

    await Airline.update(
      {
        iata_code,
        airline,
      },

      {
        where: {
          id,
        },
      }
    );

    return `Aerolinea '${airlineId.airline}' modificado con éxito.`;
  } catch (e) {
    console.error(`${ERROR}, putAirline --→ ${e}`);
  }
};

// DELETE (ONE) AIRLINE BY ID

const deleteAirline = async (id) => {
  const airlineId = (
    await Airline.findOne({
      where: { id },
    })
  ).dataValues;

  try {
    await Airline.destroy({
      where: { id },
    });
    console.log(`Aerolinea '${airlineId.airline}' borrada con exito`);
    return `Aerolinea '${airlineId.airline}' borrada con exito`;
  } catch (e) {
    console.error(`${ERROR}, deleteAirline --→ ${e}`);
  }
};

module.exports = {
  jsonAirlines,
  getAirlines,
  getAirlinesById,
  getAirlinesName,
  postAirline,
  modifyAirline,
  deleteAirline,
};
