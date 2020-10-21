// @ts-ignore
const Orders = require('./orders');
// @ts-ignore
const autoCatch = require('./lib/auto-catch'); // hight-level function for try catch
module.exports = autoCatch({
	createOrder,
	getOrder,
	listOrders,
	deleteOrder,
});

async function createOrder(req, res) {
	const product = await Orders.create(req.body);
	res.json(product);
}

async function getOrder(req, res, next) {
	const { id } = req.params;
	const order = await Orders.get(id);
	if (!order) return next(); // next handler or middleware
	res.json(order);
}

async function listOrders(req, res) {
	const { offset = 0, limit = 25 } = req.query;
	const orders = await Orders.list({
		offset: Number(offset),
		limit: Number(limit),
	});
	res.json(orders);
}

async function deleteOrder(req, res, next) {
	const { id } = req.params;
	await Orders.remove(id);
	res.json({ success: true });
}
