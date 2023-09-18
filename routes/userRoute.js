const express = require("express");
const { body, oneOf } = require("express-validator");
const { forwardAuthenticated, login, signup, validateErrors, validateSignupFields, validateResetPasswordEmail, validateResetPasswordForm } = require("../controllers/authController.js");
const { prisma } = require("../utils/prisma.js");
const supabase = require("../utils/supabase.js");
const passport = require("passport");
const router = express.Router();

router
	.route("/login")
	.get(forwardAuthenticated, (req, res) => {
		res.render("login", { title: "Log in - Quodra Fx" });
	})
	.post(login);

router.route("/authorize").get((req, res) => {
	if ('type' in req.query && req.query.type == "recovery") {
		res.redirect("/dashboard/recover-password")
	} else {
		// console.log(req.query);
		console.log("authorizing and redirecting...");
		//
		req.flash("success_msg", "Account verified, now you can login");
		res.redirect("/user/login");
	}
});

router
	.route("/signup")
	.get((req, res) => {
		res.render("signup", { title: "Sign up - Quodra Fx" });
	})
	.post(
		validateSignupFields,
		validateErrors,
		// validateErrors,
		signup
	);

router.get("/forgot-password", async (req, res) => {
	// console.log(req.session)
	res.render("forgot-password-form", { title: "Sign up - Quodra Fx", level: 1 });
}).post("/forgot-password", validateResetPasswordEmail, validateErrors, async (req, res, next) => {
	// next()
	try {
		let { data, error } = await supabase.auth.resetPasswordForEmail(req.body.email)
		console.log(error)
		console.log(data)
		if (error != null) {
			req.flash(
				"error_msg",
				"Error encountered while trying to send password reset link"
			);
			return res.redirect("back");
		}
		// req.flash("success_msg", "Password reset link sent");
		// return res.redirect("/user/forgot-password")

		// req.flash("success_msg", "Password link has been sent");
		// return res.redirect("/user/login")
		const { email, password } = await prisma.user.findUnique({ where: { email: req.body.email }, select: { password: true, email: true } })
		req.body = { email, password }
		next()
	} catch (error) {
		console.log(error)
		req.flash("error_msg", "Internal server error")
		return res.redirect("back")
	}
}, (req, res, next) => {
	passport.authenticate("local", {
		successRedirect: "/user/forgot-password",
		failureRedirect: "/user/forgot-password",
		// successFlash: true,

		failureFlash: true,
	})(req, res, next);
}, (req, res, next) => {
	console.log("login ok")
	req.flash("success_msg", "Password reset link sent to email.")
	next()
})
// router.get("/reset-password", async (req, res) => {
// 	res.render("reset-password-page", { title: "Sign up - Quodra Fx", level: 2 });
// }).post("/reset-password", validateResetPasswordForm, validateErrors, async (req, res) => {
// 	try {


// 		const { data, error } = await supabase.auth.updateUser({
// 			email: req.body.email,
// 			password: req.body.password,
// 		})
// 		console.log(error)
// 		if (error != null) {
// 			req.flash(
// 				"error_msg",
// 				"Error encountered while trying to reset password"
// 			);
// 			return res.redirect("back");
// 		}
// 		req.flash("success_msg", "Your password has been reset");
// 		return res.redirect("/user/login")
// 	} catch (error) {

// 		console.log(error)
// 		req.flash("error_msg", "Internal server error")
// 		return res.redirect("back")
// 	}
// })

module.exports = router;
