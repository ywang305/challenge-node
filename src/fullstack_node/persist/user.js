const { isEmail, isAlphanumeric } = require('validator');

const db = require('./dbconn');

function usernameSchema() {
	return {
		type: String,
		required: true,
		unique: true, // unique index in MongoDB, but not ensure user is UNIQUE!
		lowercase: true, // all usernames will be set to lowercase before saving
		minLength: 3,
		maxLength: 16,
		validate: [
			{
				validator: isAlphanumeric,
				message: (props) => `${props.value} contains special characters`,
			},
			{
				validator: (str) => !str.match(/^admin$/i),
				message: (props) => 'Invalid username',
			},
			{
				validator: function (username) {
					return isUnique(this, username);
				},
				message: (props) => 'Username is taken',
			},
		],
	};
}

async function isUnique(doc, username) {
	const existing = await User.findOne({ username });
	return !existing || String(doc._id) === String(existing._id);
}

function emailSchema(opts = {}) {
	const { required } = opts;
	return {
		type: String,
		required: !!required,
		validate: {
			validator: isEmail,
			message: (props) => `${props.value} is not a valid email address`,
		},
	};
}

const User = db.model('User', {
	username: usernameSchema(),
	password: { type: String, maxLength: 120, required: true },
	email: emailSchema({ required: true }),
});

module.exports = User;
