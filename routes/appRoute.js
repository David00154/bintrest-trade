const express = require("express");

const router = express.Router();

router.route("/").get((req, res) => {
	res.render("index", { title: "Fx-Network" });
});
router.route("/about").get((req, res) => {
	res.render("about", { title: "About - Fx-Network" });
	// res.redirect("/")
});
router.route("/contact-us").get((req, res) => {
	res.render("contact", { title: "Contact us - Fx-Network" });
});

module.exports = router;
