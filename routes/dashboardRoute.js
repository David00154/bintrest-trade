const express = require("express");
const {
	ensureAuthenticated,
	validateWithdrawFormFields,
	validateErrors,
	validateFormErrors,
} = require("../controllers/authController.js");
const { prisma } = require("../utils/prisma.js");

const router = express.Router();
router.use((req, res, next) => {
	req.session.current_url = req.baseUrl + "" + req.url;
	next();
});

router.route("/").get(ensureAuthenticated, async (req, res) => {
	// console.log(req.user.id);
	try {
		let name =
			req.user.name.split(" ")[0][0].toUpperCase() +
			req.user.name.split(" ")[0].slice(1);
		let user = req.user;
		let email = req.user.email;
		let {
			stat: { balance, deposit, earning, withdraws },
		} = await prisma.user.findUnique({
			where: {
				id: req.user.id,
			},
			select: {
				stat: {
					select: {
						balance: true,
						deposit: true,
						earning: true,
						withdraws: true,
					},
				},
			},
		});
		res.render(
			"backend/dashboard",
			buildObject({
				title: "Dashboard",
				layout: "backend/layout",
				user: req.user,
				name,
				// earning,
				// deposit,
				// balance,
				// withdraws,
				email: req.user.email,
				extractScripts: true,
			})
		);
	} catch (err) {
		console.log(err);
		req.flash(
			"error_msg",
			"Error trying to locate the page, try loging in."
		);
		res.redirect("/user/login");
	}
});
router
	.route("/wallet")
	.get(ensureAuthenticated, async (req, res) => {
		// console.log(req.user.id);
		try {
			let name =
				req.user.name.split(" ")[0][0].toUpperCase() +
				req.user.name.split(" ")[0].slice(1);
			let user = req.user;
			let email = req.user.email;
			let {
				stat: { balance, deposit, earning, withdraws },
				latestTransactions,
			} = await prisma.user.findUnique({
				where: {
					id: req.user.id,
				},
				select: {
					stat: {
						select: {
							balance: true,
							deposit: true,
							earning: true,
							withdraws: true,
						},
					},
					latestTransactions: {
						select: {
							amount: true,
							status: true,
							date: true,
						},
					},
				},
			});
			res.render(
				"backend/wallet",
				buildObject({
					title: "Withdraw",
					layout: "backend/layout",
					user,
					name,
					email,
					earning,
					deposit,
					balance,
					withdraws,
					latestTransactions,
				})
			);
		} catch (err) {
			console.log(err);
			req.flash(
				"error_msg",
				"Error trying to locate the page, try loging in."
			);
			res.redirect("/user/login");
		}
	});

router
	.route("/withdraw")
	.get(ensureAuthenticated, async (req, res) => {
		// console.log(req.user.id);
		try {
			let name =
				req.user.name.split(" ")[0][0].toUpperCase() +
				req.user.name.split(" ")[0].slice(1);
			let user = req.user;
			let email = req.user.email;
			res.render(
				"backend/withdraw",
				buildObject({
					title: "Withdraw",
					layout: "backend/layout",
					user,
					name,
					email,
				})
			);
		} catch (err) {
			console.log(err);
			req.flash(
				"error_msg",
				"Error trying to locate the page, try loging in."
			);
			res.redirect("/user/login");
		}
	})
	.post(
		validateWithdrawFormFields,
		(req, res, next) =>
			validateFormErrors(
				req,
				res,
				next,
				"/dashboard/withdraw"
			),
		async (req, res, next) => {
			const { amount } = req.body;
			let date =
				new Date(Date.now()).getFullYear() +
				"-" +
				(new Date(Date.now()).getMonth() + 1) +
				"-" +
				new Date(Date.now()).getDate(); // yyyy-mm-dd
			try {
				await prisma.latestTransaction.create({
					data: {
						amount,
						userId: req.user.id,
						status: false,
						date,
					},
				});
				req.flash(
					"success_msg",
					"Your withdrawal request is processing, we will send you feedback."
				);
				res.redirect("/dashboard/withdraw");
				// next();
			} catch (error) {
				console.log(error);
				req.flash(
					"error_msg",
					"There was an error trying to process the request."
				);
				// res.redirect("/dashboard/withdraw");
				// next();
				res.render(
					"backend/withdraw",
					buildObject({
						title: "Withdraw",
						layout: "backend/layout",
						user,
						name,
						email,
					})
				);
			}
		}
	);

router
	.route("/notifications")
	.get(ensureAuthenticated, (req, res) => {
		let name =
			req.user.name.split(" ")[0][0].toUpperCase() +
			req.user.name.split(" ")[0].slice(1);
		res.render(
			"notifications",
			buildObject({
				title: "Notifications",
				layout: "_layouts/dashboard_layout",
				name,
				user: req.user,
			})
		);
	});

function buildObject(obj) {
	let {
		name = "",
		user = "",
		title = "",
		deposit = "",
		earning = "",
		balance = "",
		withdraws = "",
		email = "",
		extractScripts = true,
		latestTransactions = [],
	} = obj;
	return {
		...obj,
		name,
		user,
		title,
		deposit,
		earning,
		balance,
		withdraws,
		email,
		extractScripts,
		latestTransactions,
	};
}

module.exports = router;
