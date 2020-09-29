// @ts-nocheck
const fs = require('fs');
const path = require('path');

const file1 = 'aaa.txt'; // utuLAIK6.wav
const file2 = 'bbb.txt'; //UHcJvx5P.wav
const dest = 'abc.txt';

const ws = fs.createWriteStream(path.resolve('./wavs/' + dest), {
	flags: 'a',
});

const rs1 = fs.createReadStream(path.resolve('./wavs/' + file1));
const rs2 = fs.createReadStream(path.resolve('./wavs/' + file2));

(async function () {
	for await (const chunk of rs1) {
		ws.write(chunk);
	}
	for await (const chunk of rs2) {
		ws.write(chunk);
	}
	ws.end(); // dont have to
})();
