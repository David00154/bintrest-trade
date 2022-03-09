const express = require("express");
const { ensureAuthenticated } = require("../controllers/authController.js") ;

const router = express.Router();

router.route("/").get(ensureAuthenticated, (req, res) => {
	res.send("<h1>Nothing here yet you dummy!!!</h1>");
});

module.exports = router
