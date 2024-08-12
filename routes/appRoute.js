const express = require("express");

const router = express.Router();

router.route("/").get((req, res) => {
  res.render("index", { title: "Tetra Fx" });
});
router.route("/about").get((req, res) => {
  res.render("about", { title: "About - Tetra Fx" });
  // res.redirect("/")
});
router.route("/contact-us").get((req, res) => {
  res.render("contact", { title: "Contact us - Tetra Fx" });
});

module.exports = router;
