const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Flights } = require("./src/db.js");

const { jsonAirports } = require("./src/Controllers/Airports/index");
const { jsonAirlines } = require("./src/Controllers/Airlines/index");
const { FlifgthsDb } = require("./src/Controllers/Flights/index.js");

conn.sync({ force: true }).then(() => {
  const PORT = 3001;
  server.listen(PORT, async () => {
    const fligthscount = await Flights.count();
    console.log(`Server listening at port: ${PORT}`);
    await jsonAirports(); //Cargar Aeropuertos desde JSON
    await jsonAirlines(); //Cargar Aerolineas desde JSON

    await FlifgthsDb(3000); // Cargar Vuelos desde CSV
    /* pasar por argumento cantidad de vuelos a mostrar, tenga en cuenta que mientras mas vuelos mas tardara en cargarlos, y mas sobrecargara su memoria, Default: 5000*/
  });
});
