const util = require('util');
const exec = util.promisify(require('child_process').exec);

const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const basedir = path.join(__dirname, '../');
const listPath = path.join(basedir, 'input', 'list.txt');
const outPath = path.join(basedir, 'output', 'out.wav');

async function cmd(script) {
	try {
		const { stdout, stderr } = await exec(script);
		console.log('stdout:', stdout);
		console.log('stderr:', stderr);
	} catch (err) {
		console.error(err);
	}
}

module.exports = { cmd };
