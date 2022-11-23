const { Router } = require("express");

const { getAirports } = require("../../Controllers/Airports");

const router = Router();

const ERROR = `Error @ routes/Contratos --> `;

// -------------------------------------------

// ---------- GET AIRPORTS ----------
router.get("/", async (req, res) => {
  try {
    //
    const airports = await getAirports();
    if (airports.length) res.json(airports);
    else return "No se han encontrado aeropuertos.";
    //
  } catch (e) {
    res.status(400).send(ERROR, e);
  }
});

module.exports = router;
