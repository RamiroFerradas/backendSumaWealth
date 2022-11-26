const { Airport, Airline } = require("../../db");
const { Op } = require("sequelize");
const { airlines } = require("../../Json/airlines.json");

const ERROR = "Error @ Controllers/Airlines";

// SAVE DB (ALL) AIRLINES
const jsonAirlines = async () => {
  try {
    const airlinesDB = await Airline.findAll();

    if (!airlinesDB.length) {
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
      console.log("✔ Aerolineas cargadas ------------");
      return "✔ Aerolineas cargadas.";
    }
  } catch (e) {
    console.error(`${ERROR}, jsonAirlines --→ ${e}`);
  }
};

// GET (ALL) AIRLINES
const getAirlines = async () => {
  try {
    const airline = await Airline.findAll({ order: ["airline"] });
    if (airline.length) {
      console.log(`Se encontraron ${airline.length} aerolineas`);
      return airline;
    } else {
      return "No se encontraron aerolineas";
    }
  } catch (e) {
    console.error(`${ERROR}, getAirlines --→ ${e}`);
    return e.message;
  }
};

// GET (ONE) AIRLINE BY ID
const getAirlinesById = async (id) => {
  try {
    const airlineID = await Airline.findOne({
      where: { id },
    });
    if (airlineID) {
      return airlineID;
    } else {
      console.log(`No se encontraron aerolineas con el ID: ${id}`);
      return `No se encontraron aerolineas con el ID: ${id}`;
    }
  } catch (e) {
    console.error(`${ERROR}, getAirlinesByName --→ ${e}`);
    return e.message;
  }
};

// GET (ALL) AIRLINE BY NAME
const getAirlinesName = async (name) => {
  try {
    const airlineName = await Airline.findAll({
      where: { airline: { [Op.iLike]: `%${name}%` } },
    });
    if (airlineName) {
      return airlineName;
    } else {
      console.log(`No se encontraron aerolineas con el nombre: ${name}`);
      return `No se encontraron aerolineas con el nombre: ${name}`;
    }
  } catch (e) {
    console.error(`${ERROR}, getAirlinesByName --→ ${e}`);
    return e.message;
  }
};

// POST (ONE) AIRLINE
const postAirline = async (data) => {
  try {
    let { iata_code, airline } = data;

    if (iata_code) {
      const [row, created] = await Airline.findOrCreate({
        where: {
          airline,
        },
        defaults: {
          iata_code,
        },
      });
      if (!created) {
        return `la Aerolinea '${airline}' ya existe`;
      } else {
        const airlineId = await Airline.findOne({
          where: { airline },
        });
        return `Aerolinea '${airline}' creada correctamente con el ID: ${airlineId.id}`;
      }
    } else {
      return "Por favor ingresar iata_code";
    }
  } catch (e) {
    console.error(`${ERROR}, postAirline --→ ${e}`);
    return e.message;
  }
};

// PUT (ONE) AIRLINE BY ID

const modifyAirline = async (id, data) => {
  try {
    let { iata_code, airline } = data;

    const airlineId = await Airline.findOne({
      where: { id },
    });

    if (airlineId) {
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
    } else {
      return `No se encontro aerolinea con el ID: ${id}`;
    }
  } catch (e) {
    console.error(`${ERROR}, putAirline --→ ${e}`);
    return e.message;
  }
};

// DELETE (ONE) AIRLINE BY ID

const deleteAirline = async (id) => {
  try {
    const airlineId = await Airline.findOne({
      where: { id },
    });
    if (airlineId) {
      await Airline.destroy({
        where: { id },
      });
      console.log(`Aerolinea '${airlineId.airline}' borrada con exito`);
      return `Aerolinea '${airlineId.airline}' borrada con exito`;
    } else {
      return "La aerolinea ya fue eliminada";
    }
  } catch (e) {
    console.error(`${ERROR}, deleteAirline --→ ${e}`);
    return e.message;
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
