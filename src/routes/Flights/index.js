const { Router } = require("express");
const { Fligths } = require("../../db");

const { getFlights, getFligthsById } = require("../../Controllers/Flights");

const router = Router();

const ERROR = `Error @ routes/Flights --> `;

// -------------------------------------------

// ---------- GET FLIGHTS // GET FLIGHTS BY NAME ----------
router.get("/", async (req, res) => {
  const { page } = req.query; // traer pag por query

  try {
    const { name } = req.query;
    if (name) {
      // res.json(await getFlightsByName(name));
    } else {
      const flights = await getFlights(page);
      if (flights.length) res.json(flights);
      else return "No se han encontrado vuelos.";
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
    res.json(await getFligthsById(id));
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

module.exports = router;
