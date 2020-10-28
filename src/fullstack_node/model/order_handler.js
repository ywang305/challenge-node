const Orders = require('./orders');
const autoCatch = require('../lib/auto-catch'); // hight-level function for try catch
module.exports = autoCatch({
	createOrder,
	getOrder,
	listOrders,
	deleteOrder,
});

async function createOrder(req, res) {
	const fields = req.body;
	if (!req.isAdmin) fields.username = req.user.username;
	const order = await Orders.create(fields);
	res.json(order);
}

async function getOrder(req, res, next) {
	const { id } = req.params;
	const order = await Orders.get(id);
	if (!order) return next(); // next handler or middleware
	res.json(order);
}

async function listOrders(req, res) {
	const { offset = 0, limit = 25, status } = req.query;
	const opts = {
		offset: Number(offset),
		limit: Number(limit),
		status,
	};
	if (!req.isAdmin) opts.username = req.user.username;
	const orders = await Orders.list(opts);
	res.json(orders);
}

async function deleteOrder(req, res, next) {
	const { id } = req.params;
	await Orders.remove(id);
	res.json({ success: true });
}
