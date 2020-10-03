const Product = require('./persist/product');

module.exports = { get, list, create, edit, remove };

async function get(_id) {
	const product = await Product.findById(_id);
	return product;
}

async function list(opts = {}) {
	const { offset = 0, limit = 25, tag } = opts;
	const query = tag ? { tags: tag } : {};
	const products = await Product.find(query)
		.sort({ _id: 1 })
		.skip(offset)
		.limit(limit);
	return products;
}

async function create(fields) {
	const product = await new Product(fields).save();
	return product;
}

async function edit(_id, change) {
	const product = await get({ _id });
	Object.keys(change).forEach(function (key) {
		product[key] = change[key];
	});
	await product.save();
	return product;
}

async function remove(_id) {
	await Product.deleteOne({ _id });
}
