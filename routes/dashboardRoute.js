const express = require("express");
const { ensureAuthenticated } = require("../controllers/authController.js") ;

const router = express.Router();
router.use((req, res, next) => {
	req.session.current_url = req.baseUrl + "" + req.url
	next()
})

router.route("/").get(ensureAuthenticated, (req, res) => {
	let name = req.user.name.split(" ")[0]
	res.render("dashboard", buildObject({title: "Dashboard", layout: "_layouts/dashboard_layout", user: req.user, name}));
});
router.route("/notifications").get(ensureAuthenticated, (req, res) => {
	let name = req.user.name.split(" ")[0]
	res.render("notifications", buildObject({title: "Notifications", layout: "_layouts/dashboard_layout", name, user: req.user}));
});

function buildObject(obj) {
	let {name = "", user = "" , title = ""} = obj
	return {...obj, name, user, title}
}

module.exports = router
