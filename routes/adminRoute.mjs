import express from "express";
import {
	ensureAuthenticated,
	restrictToAdmin,
	validateErrors,
} from "../controllers/authController.mjs";

import {
	sendNotification,
	validateNotificationsFields,
	validateUpdateUserFields,
	updateUserStat,
} from "../controllers/adminController.mjs";

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

export default router;
