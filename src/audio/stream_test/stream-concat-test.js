// @ts-nocheck
const fs = require('fs');
const path = require('path');

const dir = path.resolve('./src/audio/stream_test');
const file1 = path.resolve(dir, 'aaa.txt');
const file2 = path.resolve(dir, 'bbb.txt');
const dest = path.resolve(dir, 'aabb.txt');

const ws = fs.createWriteStream(dest, {
	flags: 'a',
});

const rs1 = fs.createReadStream(file1);
const rs2 = fs.createReadStream(file2);

(async function () {
	for await (const chunk of rs1) {
		ws.write(chunk);
	}
	for await (const chunk of rs2) {
		ws.write(chunk);
	}
	ws.end(); // dont have to?
})();
