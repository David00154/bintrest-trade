const express = require("express");
const { body, oneOf } = require("express-validator");
const {
	forwardAuthenticated,
	login,
	signup,
	validateErrors,
	validateSignupFields,
} = require("../controllers/authController.js");
const { prisma } = require("../utils/prisma.js");
const router = express.Router();

router
	.route("/login")
	.get(forwardAuthenticated, (req, res) => {
		res.render("login", {title: "Log in - Binterest"});
	})
	.post(login);

router
	.route("/signup")
	.get((req, res) => {
		res.render("signup", {title: "Sign up - Binterest"});
	})
	.post(
		validateSignupFields,
		validateErrors,
		// validateErrors,
		signup
	);
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success_msg", "You are logged out");
	res.redirect("/user/login");
});

module.exports = router
