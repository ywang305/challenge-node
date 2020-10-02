function autoCatch(obj) {
	const wrapper = {};
	Object.keys(obj).forEach((k) => {
		const handler = obj[k];
		wrapper[k] = (req, res, next) => {
			try {
				handler(req, res, next);
			} catch (err) {
				return next(err);
			}
		};
	});
	return wrapper;
}

module.exports = autoCatch;
