const mongoose = require('mongoose');
const { isEmail } = require('validator');
const db = require('./dbconn');

function emailSchema(opts = {}) {
	const { required } = opts;
	return {
		type: String,
		required: !!required,
		validate: {
			validator: isEmail,
			message: (props) => `${props.value} is not a valid Email`,
		},
	};
}

const Order = db.model('Order', {
	// _id: { type: String, default: cuid },
	buyerEmail: emailSchema({ required: true }),
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			index: true,
			required: true,
		},
	],
	status: {
		type: String,
		index: true,
		default: 'CREATED',
		enum: ['CREATED', 'PENDING', 'COMPLETED'],
	},
});

module.exports = Order;
