'use strict';
var send = require("../configs/response.conf");
var conf = require("../configs/app.conf");
var lib = require("../utils/lib");
let console = conf.console;


module.exports = {
	read, readOne, create, search,
}

/**
 * Search from candidates
 * @param {*} req 
 * @param {*} res 
 */
function search(req, res) {
	req.params.search = true;
	read(req, res);
}

/**
 * Get the candidates
 * @param {*} req 
 * @param {*} res 
 */
function read(req, res) {
	(async _ => {
		let limit = conf.limits.candidates, skip = 0, qrLimit = req.query.limit, qrPage = req.query.page, query = req.params.search ? req.query : {};
		delete req.query.page;
		delete req.query.limit;

		if (!isNaN(qrLimit) && Number(qrLimit) <= conf.limits.maxCandidates)
			limit = Number(qrLimit);
		if (!isNaN(qrPage) && Number(qrPage) > 1)
			skip = (Number(qrPage) - 1) * limit;

		let data = await conf.collections.candidates.find(query).skip(skip).limit(limit).project({ _id: 0 }).toArray();
		if (!data.length)
			return send.notFound(res);
		send.ok(res, {
			current_page: (skip / limit) + 1,
			from: skip + 1,
			to: skip + data.length,
			per_page: limit,
			data: data,
		});
	})().catch(err => {
		console.error(err);
		send.serverError(res);
	});
}

/**
 * Get one candidate using 
 * @param {*} req 
 * @param {*} res 
 */
function readOne(req, res) {
	(async _ => {
		let foo = await conf.collections.candidates.find({ id: req.params.id }).project({ _id: 0 }).toArray();
		if (!foo.length)
			return send.notFound(res);
		return send.ok(res, foo[0]);
	})().catch(err => {
		console.error(err);
		send.serverError(res);
	});
}

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
		delete candidate._id;
		send.created(res, candidate);
	})().catch(err => {
		console.error(err);
		send.serverError(res);
	});
}