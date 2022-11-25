const { Router } = require("express");
const { Fligths } = require("../../db");

const {
  getFlights,
  postFlight,
  modifyFlight,
  deleteFlight,
} = require("../../Controllers/Flights");
const {
  getFligthsById,
  getFligthsByNumber,
  getFligthsByTailNumber,
} = require("../../Controllers/Flights/FlightsQuerys");

const router = Router();

const ERROR = `Error @ routes/Flights --> `;

// -------------------------------------------

// -------- GET ALL FLIGHTS // GET FLIGHTS BY NAME/FLIGHT NUMBER/TAIL NUMBER --------
router.get("/", async (req, res) => {
  const { page, flight_number, tail_number } = req.query;

  try {
    if (flight_number || tail_number) {
      flight_number && res.json(await getFligthsByNumber(flight_number));
      tail_number && res.json(await getFligthsByTailNumber(tail_number));
    } else {
      res.json(await getFlights(page));
    }
  } catch (e) {
    res.status(400).send(ERROR, e);
  }
});

// ---------- GET FLIGHT BY ID ----------

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    res.json(await getFligthsById(id));
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

// ---------- POST FLIGHT ----------

router.post("/", async (req, res) => {
  try {
    res.json(await postFlight(req.body));
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

// ---------- MODIFY FLIGHT ----------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await modifyFlight(id, req.body));
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

// DELETE FLIGHT
router.delete("/:id", async (req, res) => {
  //
  try {
    const { id } = req.params;
    res.json(await deleteFlight(id, req.body));

    //
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

module.exports = router;
