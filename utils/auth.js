let conf = require("../configs/app.conf");
let send = require("../configs/response.conf");
let jwt = require("jsonwebtoken");
let console = conf.console;

exports.isAuthenticated = function (req, res, cb) {
	let auth = req.headers.authorization;
	if (auth.indexOf("Bearer") == 0)
		auth = auth.slice(7);
	try {
		jwt.verify(auth);
		cb(null, req, res);
	} catch (error) {
		console.error(JSON.stringify(error));
		send.forbidden(res);
	}
}