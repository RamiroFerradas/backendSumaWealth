const { Router } = require("express");

const airportsRoute = require("./Airports/index.js");
const airlinesRoute = require("./Airlines/index.js");

const router = Router();
// -----------------------------------------

router.use("/airports", airportsRoute);
router.use("/airlines", airlinesRoute);

module.exports = router;
