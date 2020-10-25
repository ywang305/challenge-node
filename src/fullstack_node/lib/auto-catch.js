function autoCatch(obj) {
	const wrapper = {};
	Object.keys(obj).forEach((k) => {
		const handler = obj[k];
		wrapper[k] = async (req, res, next) => {
			try {
				await handler(req, res, next);
			} catch (err) {
				return next(err); // mongoose model validation exception
			}
		};
	});
	return wrapper;
}

module.exports = autoCatch;
