const { oneOf, body, query } = require("express-validator");
const { prisma } = require("../utils/prisma.js");
const sendNotification = async (req, res, next) => {
	const { email, title, body } = req.body;
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
		select: {
			id: true,
		},
	});

	const sentNotification = await prisma.notification.create({
		data: {
			body,
			title,
			userId: user.id,
		},
	});
	console.log(sentNotification);
	res.send("oks");
};

const updateUserStat = async (req, res, next) => {
	const { uid } = req.query;
	const { earning, balance, deposit, withdraws } = req.body;

	const updatedUser = await prisma.stat.update({
		where: {
			userId: uid,
		},
		data: {
			balance,
			earning,
			deposit,
			withdraws,
		},
	});
	res.json(updatedUser);
};

const validateUpdateUserFields = oneOf([
	[
		query("uid")
			.exists()
			.withMessage("Select a user to update"),
		body("earning")
			.notEmpty()
			.withMessage("Please add earning for the user"),
		body("balance")
			.notEmpty()
			.withMessage("Please add balance for the user"),
		body("withdraws")
			.notEmpty()
			.withMessage("Please add withdraws for the user"),
	],
]);

const validateNotificationsFields = oneOf([
	[
		body("title")
			.notEmpty()
			.withMessage("Title field is required"),
		body("body")
			.notEmpty()
			.withMessage("Body field is required"),
		body("email")
			.notEmpty()
			.withMessage("Please select a user email"),
	],
]);

module.exports = {
	validateNotificationsFields,
	validateUpdateUserFields,
	updateUserStat,
	sendNotification,
};
