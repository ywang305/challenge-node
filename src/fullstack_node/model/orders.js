const Order = require('../persist/order');

async function get(_id) {
	const order = await Order.findById(_id).populate('products').exec();
	return order;
}

async function create(fields) {
	const order = await new Order(fields).save();
	return order;
}

async function remove(_id) {
	await Order.deleteOne({ _id });
}

async function list(opts = {}) {
	const { offset = 0, limit = 25, status, username } = opts;
	const query = {};
	if (status) {
		query.status = status;
	}
	if (username) {
		query.username = username;
	}
	const orders = await Order.find(query) /* find all, may return empty [] */
		.sort({ _id: 1 })
		.skip(offset)
		.limit(limit);
	return orders;
}

module.exports = { get, create, remove, list };
