const bcrypt = require('bcrypt');
const User = require('../persist/user');

async function get(username) {
	const user = await User.findOne({ username });
	return user;
}
async function list(opts = {}) {
	const { offset = 0, limit = 25 } = opts;
	const users = await User.find().sort({ _id: 1 }).skip(offset).limit(limit);
	return users;
}
async function remove(username) {
	await User.deleteOne({ username });
}

async function create(fields) {
	const user = new User(fields);
	await hashPassword(user);
	await user.save();
	return user;
}
async function edit(username, change) {
	const user = await get(username);
	Object.keys(change).forEach((key) => {
		user[key] = change[key];
	});
	if (change.password) await hashPassword(user);
	await user.save();
	return user;
}

const SALT_ROUNDS = 10;
async function hashPassword(user) {
	if (!user.password) throw user.invalidate('password', 'password is required');
	if (user.password.length < 12)
		throw user.invalidate('password', 'password must be at list 12 characters');
	user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
}

module.exports = { get, list, remove, create, edit };
