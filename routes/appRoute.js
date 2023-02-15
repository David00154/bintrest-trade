const express = require("express");

const router = express.Router();

router.route("/").get((req, res) => {
	res.render("index", { title: "Quodra Fx" });
});
router.route("/about").get((req, res) => {
	res.render("about", { title: "About - Quodra Fx" });
	// res.redirect("/")
});
router.route("/contact-us").get((req, res) => {
	res.render("contact", { title: "Contact us - Quodra Fx" });
});

module.exports = router;
