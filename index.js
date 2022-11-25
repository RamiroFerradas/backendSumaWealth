const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const { jsonAirports } = require("./src/Controllers/Airports/index");
const { jsonAirlines } = require("./src/Controllers/Airlines/index");

conn.sync({ force: false }).then(() => {
  const PORT = 3001;
  server.listen(PORT, async () => {
    console.log(`Server listening at port: ${PORT}`);
    await jsonAirports();
    await jsonAirlines();
  });
});
