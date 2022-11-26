const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Flights } = require("./src/db.js");

const { jsonAirports } = require("./src/Controllers/Airports/index");
const { jsonAirlines } = require("./src/Controllers/Airlines/index");
const { FlifgthsDb } = require("./src/Controllers/Flights/index.js");

conn.sync({ alter: true }).then(() => {
  const PORT = 3001;
  server.listen(PORT, async () => {
    const fligthscount = await Flights.count();
    console.log(`Server listening at port: ${PORT}`);
    await jsonAirports(); //Cargar Aeropuertos desde JSON
    await jsonAirlines(); //Cargar Aerolineas desde JSON
    if (fligthscount < 5000000) {
      await FlifgthsDb(); // Cargar Vuelos desde CSV
    }
  });
});
