module.exports = { cors, notFound, handleError };

function cors(req, res, next) {
	const origin = req.headers.origin;
	res.setHeader('Access-Control-Allow-Origin', origin || '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'POST, GET, PUT, DELETE, OPTIONS, XMODIFY'
	);
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Max-Age', '86400');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
	);
	next();
}

function handleError(err, req, res, next) {
	console.error(err);
	if (res.headersSent)
		return next(
			err
		); /* There are possible problematic interactions between the default express error handler
	and custom error handlers. We’ve skipped it here, but best practice is to only respond if
	res.headersSent is false within a custom error handler. See Error Handling⁵⁶ in the official
	express documentation for more information. */

	res.status(500).json({ error: 'Internal Error' });
}

function notFound(req, res) {
	res.status(404).json({ error: 'Not Found' });
}
