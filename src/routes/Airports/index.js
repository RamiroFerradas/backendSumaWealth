const { Router } = require("express");

const {
  getAirports,
  getAirportsByName,
  getAirportsById,
} = require("../../Controllers/Airports");

const router = Router();

const ERROR = `Error @ routes/Airports --> `;

// -------------------------------------------

// ---------- GET AIRPORTS // GET AIRPORTS BY NAME ----------
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      res.json(await getAirportsByName(name));
    } else {
      const airports = await getAirports();
      if (airports.length) res.json(airports);
      else return "No se han encontrado aeropuertos.";
    }
  } catch (e) {
    res.status(400).send(ERROR, e);
  }
});

// ---------- GET AIRPORTS BY ID ----------

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    res.json(await getAirportsById(id));
  } catch (e) {
    res.status(404).send(`Error --→ ${e}`);
  }
});

module.exports = router;
