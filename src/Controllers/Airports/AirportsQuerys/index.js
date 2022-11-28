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
    const airportCountry = await Airport.findAll({
      where: {
        country: { [Op.iLike]: `%${country}%` },
      },
    });
    if (airportCountry.length) {
      console.log(
        `Se encontraron ${airportCountry.length} aeropuertos en ese pais`
      );
      return airportCountry;
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
  try {
    // city = city.toUpperCase();
    const airportCity = await Airport.findAll({
      where: {
        city: { [Op.iLike]: `%${city}%` },
      },
    });
    if (airportCity.length) {
      console.log(
        `Se encontraron ${airportCity.length} aeropuertos en esa ciudad`
      );
      return airportCity;
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
