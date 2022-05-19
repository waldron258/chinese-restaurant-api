const router = require("express").Router();

const actions = require("./actions/routes");

router.use("/actions", actions);

module.exports = router;
