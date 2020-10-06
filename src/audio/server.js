require('dotenv').config();
const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const port = process.env.PORT || 1337;

const express = require('express');
const app = express();
app.use(express.static(path.resolve('public')));

const server = require('http').createServer(app);

const io = require('socket.io')(server);

const inputDir = path.resolve(__dirname, 'input');
const listFile = path.resolve(inputDir, 'list.txt');
const outDir = path.join(__dirname, 'output');
const outFile = path.join(outDir, 'out.wav');

io.on('connection', (socket) => {
	socket.on('audio/wav', async (buffer) => {
		console.log('. . . rcvd audio/wav on socket');
		const filename = `${Date.now()}.wav`;
		const inFile = path.resolve(inputDir, filename);
		await fsp.writeFile(inFile, buffer);
		const listItem = 'file ' + filename + '\n';
		await fsp.writeFile(listFile, listItem, { flag: 'a' });
	});
});

function sleep(ms) {
	return new Promise((rsv) => {
		this.tid = setTimeout(rsv, ms);
	});
}

const { cmd } = require('./shell_test/cmd');

async function emitWavToClient() {
	const script = `rm -f ${outDir}/* && ffmpeg -f concat -i ${listFile} ${outFile}`;
	while (true) {
		await sleep(10000);
		const files = await fsp.readdir(inputDir);
		if (files.length === 0) {
			continue;
		}

		await cmd(script);

		for (const file of files) {
			await fsp.unlink(path.join(inputDir, file));
		}
		const buffer = await fsp.readFile(outFile);
		io.emit('audio/wav-all', buffer);
	}
}

/*
fs.watch(outDir, async (eventType, filename) => {
	if (eventType === 'rename' && filename === 'out.wav') {
		try {
			await fsp.access(outFile); // out.wav is new generated
			await sleep(5000); // give ffmpeg time to finish writing

			const files = await fsp.readdir(inputDir);
			for (const file of files) {
				await fsp.unlink(path.join(inputDir, file));
			}
			const buffer = await fsp.readFile(outFile);
			io.emit('audio/wav', buffer);
		} catch (err) {
			// console.error(err.message + '  :  ' + ' no such file');
		}
	}
});
*/

app.get('/collect', async (req, res) => {
	const stat = await fsp.stat(outFile);
	res.setHeader('Content-Type', 'audio/wav');
	res.setHeader('Content-Length', stat.size);
	fs.createReadStream(outFile).pipe(res);
});

server.listen(port, () => {
	console.log(`Audio app listening at http://localhost:${port}`);
	emitWavToClient();
});
