'use strict';
var send = require("../configs/response.conf");
var conf = require("../configs/app.conf");
var lib = require("../utils/lib");
let console = conf.console;


module.exports = {
	read, create,
}

/**
 * Get the candidates
 * @param {*} req 
 * @param {*} res 
 */
function read(req, res) {}

/**
 * Create a new candidate
 * @param {*} req 
 * @param {*} res 
 */
function create(req, res) {
	(async _ => {
		let candidate = req.body;
		candidate.id = lib.createId(null, 10);
		await conf.collections.candidates.insertOne(candidate);
		send.ok(res, candidate);
	})().catch(err => {
		console.error(err);
		send.serverError(res);
	});
}