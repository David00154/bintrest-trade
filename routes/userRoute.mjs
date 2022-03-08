import express from "express";
import { body, oneOf } from "express-validator";
import {
	forwardAuthenticated,
	login,
	signup,
	validateErrors,
	validateSignupFields,
} from "../controllers/authController.mjs";
import { prisma } from "../utils/prisma.mjs";
const router = express.Router();

router
	.route("/login")
	.get(forwardAuthenticated, (req, res) => {
		res.send(`<form action="/user/login" method="post">
		<input type="text" name="email" id="">
		<input type="text" name="password" id="">
	
		<button type="submit">Submit</button>
	</form>`);
	})
	.post(login);

router
	.route("/signup")
	.get((req, res) => {
		res.send("Signup Page");
	})
	.post(
		validateSignupFields,
		validateErrors,
		(req, res, next) => validateErrors(req, res, next, ""),
		signup
	);
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success_msg", "You are logged out");
	res.redirect("/user/login");
});

export default router;
