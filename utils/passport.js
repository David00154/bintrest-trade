const { Strategy: LocalStrategy } = require("passport-local");
const { prisma } = require("./prisma.js");
module.exports.__passport__ =  function (passport) {
	passport.use(
		new LocalStrategy(
			{ usernameField: "email" },
			async (email, password, done) => {
				const user = await prisma.user.findUnique({
					where: {
						email,
					},
				});
				if (!user) {
					return done(null, false, {
						message: "That email is not registered",
					});
				} else if (user && user.password !== password) {
					return done(null, false, {
						message: "Password incorrect",
					});
				}
				return done(null, user);
			}
		)
	);
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});
		done(null, user);
	});
}
