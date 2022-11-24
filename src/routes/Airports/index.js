const { Router } = require("express");
const { Airport } = require("../../db");

const {
  getAirports,
  getAirportsByName,
  getAirportsById,
  postAirport,
  modifyAirport,
  deleteAirport,
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
    res.status(404).send(ERROR, e);
  }
});

// ---------- POST AIRPORTS ----------

router.post("/", async (req, res) => {
  try {
    res.json(await postAirport(req.body));
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

// MODIFY AIRPORT
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await modifyAirport(id, req.body));
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

// DELETE AIRPORT
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await deleteAirport(id, req.body));
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

module.exports = router;
