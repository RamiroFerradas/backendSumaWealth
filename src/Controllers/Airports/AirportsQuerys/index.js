const { Airport, Airline } = require("../../../db");
const { Op } = require("sequelize");

const ERROR = "Error @ Controllers/Airports";

// GET (ONE) AIRPORTS BY ID
const getAirportsById = async (id) => {
  try {
    const airportId = await Airport.findOne({
      where: { id },
    });
    if (airportId) {
      return airportId;
    } else {
      console.log(`No se encontraron aeropuertos con el ID: ${id}`);
      return `No se encontraron aeropuertos con el ID: ${id}`;
    }
  } catch (e) {
    console.error(`${ERROR}, getAirportByName --→ ${e}`);
    return e.message;
  }
};

// GET (ALL) AIRPORTS BY NAME
const getAirportsByName = async (name) => {
  try {
    const airportName = await Airport.findAll({
      where: { airport: { [Op.iLike]: `%${name}%` } },
    });
    if (airportName) {
      return airportName;
    } else {
      console.log(`No se encontraron aeropuertos con el nombre: ${name}`);
      return `No se encontraron aeropuertos con el nombre: ${name}`;
    }
  } catch (e) {
    console.error(`${ERROR}, getAirportByName --→ ${e}`);
    return e.message;
  }
};
// GET (ALL) AIRPORTS BY COUNTRY
const getAirportsByCountry = async (country) => {
  try {
    country = country.toUpperCase();
    const airportName = await Airport.findAll({
      where: {
        country: { [Op.iLike]: `%${country}%` },
      },
    });
    if (airportName.length) {
      return airportName;
    } else {
      console.log(`No se encontraron aeropuertos en el pais: ${country}`);
      return `No se encontraron aeropuertos en el pais: ${country}`;
    }
  } catch (e) {
    console.error(`${ERROR}, getAirportByName --→ ${e}`);
    return e.message;
  }
};

// GET (ALL) AIRPORTS BY CITY

const getAirportsByCity = async (city) => {
  console.log("hola");
  try {
    // city = city.toUpperCase();
    const airportName = await Airport.findAll({
      where: {
        city: { [Op.iLike]: `%${city}%` },
      },
    });
    if (airportName.length) {
      return airportName;
    } else {
      console.log(`No se encontraron aeropuertos en la ciudad: ${city}`);
      return `No se encontraron aeropuertos en la ciudad: ${city}`;
    }
  } catch (e) {
    console.error(`${ERROR}, getAirportsByCity --→ ${e}`);
    return e.message;
  }
};

module.exports = {
  getAirportsByName,
  getAirportsById,
  getAirportsByCountry,
  getAirportsByCity,
};
