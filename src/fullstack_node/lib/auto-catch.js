function autoCatch(obj) {
	const wrapper = {};
	Object.keys(obj).forEach((k) => {
		const handler = obj[k];
		wrapper[k] = async (req, res, next) => {
			try {
				await handler(req, res, next);
			} catch (err) {
				return next(err);
			}
		};
	});
	return wrapper;
}

module.exports = autoCatch;
