const db = require('./dbconn');
const { isURL } = require('validator');

function urlSchema(opts = {}) {
	const { required } = opts;
	return {
		type: String,
		required: !!required,
		validate: {
			validator: isURL,
			message: (props) => `${props.value} is not a valid URL`,
		},
	};
}

const Product = db.model('Product', {
	// this object is a schema
	description: { type: String, required: true },
	imgThumb: urlSchema({ required: true }),
	img: urlSchema({ required: true }),
	link: urlSchema(),
	userId: { type: String, required: true },
	userName: { type: String, required: true },
	userLink: urlSchema(),
	tags: { type: [String], index: true },
});

module.exports = Product;
