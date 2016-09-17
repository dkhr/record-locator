module.exports = function () {
	return {
		files: [
			'*.js',
			'!test/*.js'
		],
		tests: [
			'test/*.js'
		],
		env: {
			type: 'node'
		}
	};
};