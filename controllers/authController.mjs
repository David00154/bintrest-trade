import { prisma } from "../utils/prisma.mjs";
import {
	validationResult,
	body,
	oneOf,
} from "express-validator";
import passport from "passport";
export const login = (req, res, next) => {
	passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/user/login",
		failureFlash: true,
	})(req, res, next);
};
export const signup = async (req, res) => {
	const { name, phoneNumber, email, password } = req.body;
	try {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
				phoneNumber,
				stat: {
					create: {
						balance: "0",
						earning: "0",
						withdraws: "0",
					},
				},
			},
		});
		res.redirect("/user/dashboard");
	} catch (error) {
		throw error;
	}
};

export const forwardAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect("/dashboard");
};

export const validateErrors = (
	req,
	res,
	next,
	_viewToRender
) => {
	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

export const validateSignupFields = oneOf([
	// body(),
	[
		body("name")
			// .withMessage("Where is the name??")
			.notEmpty()
			.withMessage("The name field should not be empty"),
		body("email")
			.notEmpty()
			.withMessage("The email field should not be empty")
			.custom(async (email = "") => {
				console.log(email);
				const user = await prisma.user.findUnique({
					where: {
						email,
					},
				});
				if (user) {
					throw new Error(
						"There is an account with this email"
					);
				}
				return true;
			}),
		body("phoneNumber")
			.notEmpty()
			.withMessage(
				"The phoneNumber field should not be empty"
			),
		body("password")
			.notEmpty()
			.withMessage("The password field should not be empty"),
	],
]);

export const ensureAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error_msg", "Please log in to view that resource");
	res.redirect("/user/login");
};

export const restrictToAdmin = (req, res, next) => {
	if (req.user.isAdmin == true) {
		return next();
	}
	req.flash("error_msg", "Restricted to admin only");
	res.redirect("/dashboard");
};
