const router = require("express").Router();
const controller = require("./controller");

/* ----------- POST ----------- */

router.route("/create").post(controller.create);

/* ----------- PUT ----------- */

router.route("/update").put(controller.update);

/* ----------- GET ----------- */

router.route("/retrieve").get(controller.retrieve);

/* ----------- DELETE ----------- */

router.route("/remove").delete(controller.remove);

module.exports = router;
