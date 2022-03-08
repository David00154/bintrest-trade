import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";

import __passport__ from "./utils/passport.mjs";

// import appRoute from "./routes/appRoute.js";
// import userRoute from "./routes/userRoute.js";
// import adminRoute frp
import {
	adminRoute,
	userRoute,
	appRoute,
	dashboardRoute,
} from "./routes/index.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(__dirname);
export const app = express();

__passport__(passport);

// middlewares;
app.use(cors());
// EJS
app.use(express.static(path.join(__dirname, "static")));
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: true,
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// routes
app.use("/", appRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("*", (req, res) => {
	res.statusCode = 404;
	res.send(
		`Path "${req.baseUrl}" with method ${req.method} not found.`
	);
});

const port = process.env.PORT || 500;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
