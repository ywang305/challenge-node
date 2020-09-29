// @ts-ignore
const Products = require('./products');
// @ts-ignore
const autoCatch = require('./lib/auto-catch'); // hight-level function for try catch
module.exports = autoCatch({
	getProduct,
	listProducts,
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
