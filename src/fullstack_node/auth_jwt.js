const jwt = require('jsonwebtoken');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const autoCatch = require('./lib/auto-catch');
const Users = require('./model/users');
const bcrypt = require('bcrypt');

const jwtSecret = process.env.JWT_SECRET || 'mark it zero';
const adminPassword = process.env.ADMIN_PASSWORD || 'iamthewalrus';
const jwtOpts = { algorithm: 'HS256', expiresIn: '30d' };

passport.use(adminStrategy()); //  this stragety is used by next line
const authenticate = passport.authenticate('local', { session: false }); // no session

module.exports = {
	authenticate,
	login: autoCatch(login),
	ensureAdmin: autoCatch(ensureAdmin),
};

async function login(req, res, next) {
	const token = await sign({ username: req.user.username });
	res.cookie('jwt', token, { httpOnly: true });
	res.json({ success: true, token: token });
	/**
	 * 	By providing it in two places we make it easy
		for the client to decide how it wants to use it. 
		If the client is a browser, the cookie can be handled
		automatically, and if the client prefers to use authorization headers 
		it’s nice to provide it to them in the body.
	 */
}
function ensureAdmin(req, res, next) {
	const jwtString = req.headers.authorization || req.cookies.jwt;
	const payload = verify(jwtString);
	if (payload.username === 'admin') return next();
	const err = new Error('Unauthorized');
	err.statusCode = 401;
	next(err);
}

function adminStrategy() {
	return new Strategy(async function (username, password, cb) {
		const isAdmin = username === 'admin' && password === adminPassword;
		if (isAdmin) return cb(null, { username: 'admin' });

		try {
			const user = await Users.get(username);
			if (!user) return cb(null, false);
			const isUser = await bcrypt.compare(password, user.password);
			if (isUser) return cb(null, { username: user.username });
		} catch (err) {}

		cb(null, false);
	});
}

async function sign(payload) {
	const token = await jwt.sign(payload, jwtSecret, jwtOpts);
	return token;
}

function verify(jwtString = '') {
	jwtString = jwtString.replace(/^Bearer /i, '');
	try {
		const payload = jwt.verify(jwtString, jwtSecret);
		return payload;
	} catch (err) {
		err.statusCode = 401;
		throw err;
	}
}
