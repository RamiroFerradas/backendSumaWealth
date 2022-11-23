const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const { jsonAirports } = require("./src/Controllers/Airports/index");

conn.sync({ alter: true }).then(() => {
  const PORT = 3001;
  server.listen(PORT, async () => {
    console.log(`TODO OK !! ESCUCHANDO!! PUERTO: ${PORT}`);
    await jsonAirports();
  });
});
