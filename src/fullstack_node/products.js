const Product = require('./persist/product');

module.exports = { get, list, create };

async function get(id) {
	return 'data by id: ' + id;
}

async function list() {
	return ['data1', 'data2', 'data3'];
}

async function create(fields) {
	const product = await new Product(fields).save();
	return product;
}
