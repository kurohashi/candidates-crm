var ctrl = require("../../../controllers/candidates.controller");

// The route urls presented here are going to  
module.exports = function(app){
	app.route("/candidates")
		.get(ctrl.read)
		.post(ctrl.create);

	app.route("/candidates/search")
		.get(ctrl.search);

	app.route("/candidates/:id")
		.get(ctrl.readOne);
}	
	

