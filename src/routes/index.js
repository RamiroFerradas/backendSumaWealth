const { Router } = require("express");

const airportsRoute = require("./Airports/index.js");

const router = Router();
// -----------------------------------------

router.use("/airports", airportsRoute);

module.exports = router;
