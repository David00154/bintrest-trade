const express = require("express")

const router = express.Router();

router.route("/").get((req, res) => {
	res.render("index", { title: "Bintrest" });
});
router.route("/about").get((req, res) => {
	// res.render("about", { title: "About - Bintrest" });
	res.redirect("/")
});


module.exports = router
