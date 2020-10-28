// @ts-ignore
const Products = require('./products');
// @ts-ignore
const autoCatch = require('../lib/auto-catch'); // hight-level function for try catch
module.exports = autoCatch({
	getProduct,
	listProducts,
	createProduct,
	editProduct,
	deleteProduct,
});

async function getProduct(req, res, next) {
	const { id } = req.params;
	const product = await Products.get(id);
	if (!product) return next(); // next handler or middleware
	res.json(product);
}

async function listProducts(req, res) {
	const { offset = 0, limit = 25, tag } = req.query;
	const products = await Products.list({
		offset: Number(offset),
		limit: Number(limit),
		tag,
	});
	res.json(products);
}

async function createProduct(req, res, next) {
	if (!req.isAdmin) forbidden(next);

	const product = await Products.create(req.body);
	res.json(product);
}

async function editProduct(req, res, next) {
	if (!req.isAdmin) return forbidden(next);

	const change = req.body;
	const product = await Products.edit(req.params.id, change);
	res.json(product);
}

async function deleteProduct(req, res, next) {
	if (!req.isAdmin) return forbidden(next);

	await Products.remove(req.params.id);
	res.json({ success: true });
}

function forbidden(next) {
	const err = new Error('Forbidden');
	err.statusCode = 403;
	return next(err);
}
