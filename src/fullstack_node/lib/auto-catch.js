function autoCatch(target) {
	if(typeof target === 'function') {
		return async (req, res, next) => {
			try {
				await target(req, res, next);
			} catch (err) {
				return next(err); // mongoose model validation exception
			}
		};
	}


	const wrapper = {};
	Object.keys(target).forEach((k) => {
		const handler = target[k];
		wrapper[k] = autoCatch(handler);
	});
	return wrapper;
}

module.exports = autoCatch;
