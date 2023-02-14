const express = require("express");

const router = express.Router();

router.route("/").get((req, res) => {
	res.render("index", { title: "Coivest Capital" });
});
router.route("/about").get((req, res) => {
	res.render("about", { title: "About - Coivest Capital" });
	// res.redirect("/")
});
router.route("/contact-us").get((req, res) => {
	res.render("contact", { title: "Contact us - Coivest Capital" });
});

module.exports = router;
