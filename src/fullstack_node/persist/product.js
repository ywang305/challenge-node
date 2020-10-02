const db = require('./dbconn');

const Product = db.model('Product', {
	// this object is a schema
	description: String,
	imgThumb: String,
	img: String,
	link: String,
	userId: String,
	userName: String,
	userLink: String,
	tags: { type: [String], index: true },
});

module.exports = Product;
