const Users = require('./users');
const autoCatch = require('../lib/auto-catch');
module.exports = autoCatch({
	createUser,
	getUser,
	listUsers,
	deleteUser,
	editUser,
});

async function createUser(req, res) {
	const user = await Users.create(req.body);
	res.json(user);
}

async function getUser(req, res, next) {
	const user = await Users.get(req.params.username);
	if (!user) return next();
	res.json(user);
}

async function listUsers(req, res) {
	const { offset = 0, limit = 25 } = req.query;
	const users = await Users.list({
		offset: Number(offset),
		limit: Number(limit),
	});
	res.json(users);
}

async function deleteUser(req, res, next) {
	const { username } = req.params;
	await Users.remove(username);
	res.json({ success: true });
}

async function editUser(req, res, next) {
	const change = req.body;
	const user = await Users.edit(req.params.username, change);
	res.json(user);
}
