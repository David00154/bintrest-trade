const express = require("express");
const { ensureAuthenticated } = require("../controllers/authController.js") ;

const router = express.Router();

router.route("/").get(ensureAuthenticated, (req, res) => {
	res.send("Admin Page");
});

module.exports = router
