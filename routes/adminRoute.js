const express = require("express");
const {
	ensureAuthenticated,
	restrictToAdmin,
	validateErrors,
} = require("../controllers/authController.js");

const {
	sendNotification,
	validateNotificationsFields,
	validateUpdateUserFields,
	updateUserStat,
} = require("../controllers/adminController.js");

const router = express.Router();

router.get(
	"/",
	ensureAuthenticated,
	restrictToAdmin,
	(req, res) => {
		res.send("Admin Page");
	}
);

router.post(
	"/send-notification",
	ensureAuthenticated,
	restrictToAdmin,
	validateNotificationsFields,
	(req, res, next) => validateErrors(req, res, next, ""),
	sendNotification
);

router.post(
	"/update-user",
	ensureAuthenticated,
	restrictToAdmin,
	validateUpdateUserFields,
	(req, res, next) => validateErrors(req, res, next, ""),
	updateUserStat
);

// router.route(ensureAuthenticated)
module.exports = router