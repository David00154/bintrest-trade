const  { prisma } = require("../utils/prisma.js");
const {
	validationResult,
	body,
	oneOf,
} = require("express-validator");
const passport = require("passport");
 const login = (req, res, next) => {
	passport.authenticate("local", {
		successRedirect: deferPreviosUrl(req.session.current_url),
		failureRedirect: "/user/login",
		failureFlash: true,
	})(req, res, next);

};

function deferPreviosUrl(url) {
	// console.log("Prev url: "+ url)
	switch (url) {
		case "/dashboard/":
			return "/dashboard/"
			break;
		case "/dashboard/notifications":
			return "/dashboard/notifications"
			break;
	
		default:
			return "/dashboard/"
			break;
	}
}
 const signup = async (req, res) => {
	const { firstname, lastname, phoneNumber, email, password } = req.body;

		const user = await prisma.user.create({
			data: {
				name: `${firstname} ${lastname}`,
				email,
				password,
				phoneNumber: "",
				stat: {
					create: {
						balance: "0",
						earning: "0",
						withdraws: "0",
					},
				},
			},
		});
		req.flash("success_msg", "Signup successful!")
		res.redirect("/user/login");
};

 const forwardAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect("/dashboard");
};

 const validateErrors = (
	req,
	res,
	next,
) => {
	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		// return res.json({ errors: errors.array() });
		// console.log(errors.array())
		req.flash("error_msg", errors.array()[0].nestedErrors[0].msg)
		res.redirect("/user/signup")
	}
	next();
};

 const validateSignupFields = oneOf([
	// body(),
	[
		body("firstname")
			// .withMessage("Where is the name??")
			.notEmpty()
			.withMessage("The firstname field should not be empty"),
		body("lastname")
			// .withMessage("Where is the name??")
			.notEmpty()
			.withMessage("The lastname field should not be empty"),
		body("password")
				.notEmpty()
				.withMessage("The password field should not be empty"),
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
	],
]);

 const ensureAuthenticated = (req, res, next) => {
	//  console.log(req)
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error_msg", "Please log in to view that resource");
	res.redirect("/user/login");
};

 const restrictToAdmin = (req, res, next) => {
	if (req.user.isAdmin == true) {
		return next();
	}
	req.flash("error_msg", "Restricted to admin only");
	res.redirect("/dashboard");
};

module.exports = {
	ensureAuthenticated,
	restrictToAdmin,
	validateSignupFields,
	validateErrors,
	forwardAuthenticated,
	signup,
	login
}
