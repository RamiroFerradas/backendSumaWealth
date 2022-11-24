const { Router } = require("express");

const {
  getAirlines,
  getAirlinesName,
  getAirlinesById,
  postAirline,
  modifyAirline,
  deleteAirline,
} = require("../../Controllers/Airlines");

const router = Router();

const ERROR = `Error @ routes/Airlines --> `;

// ---------- GET AIRLINES // GET AIRLINES BY NAME ----------
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      res.json(await getAirlinesName(name));
    } else {
      const airlines = await getAirlines();
      if (airlines.length) res.json(airlines);
      else return "No se han encontrado aerolineas.";
    }
  } catch (e) {
    res.status(400).send(ERROR, e);
  }
});

// ---------- GET AIRLINES BY ID ----------

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    res.json(await getAirlinesById(id));
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

// ---------- POST AIRLINES ----------

router.post("/", async (req, res) => {
  try {
    res.json(await postAirline(req.body));
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

// MODIFY AIRLINE
router.put("/:id", async (req, res) => {
  //
  try {
    const { id } = req.params;
    res.json(await modifyAirline(id, req.body));

    //
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

// DELETE AIRLINE
router.delete("/:id", async (req, res) => {
  //
  try {
    const { id } = req.params;
    res.json(await deleteAirline(id, req.body));

    //
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

module.exports = router;
