import express from "express";
import { ensureAuthenticated } from "../controllers/authController.mjs";

const router = express.Router();

router.route("/").get(ensureAuthenticated, (req, res) => {
	res.send("Admin Page");
});

export default router;
