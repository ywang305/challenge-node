require('dotenv').config();
const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const https = require('https');
const http = require('http');

const express = require('express');
const app = express();
app.use(express.static(path.resolve('public')));

const httpServer = http.createServer(app);
const httpsServer = https.createServer(
	{
		key: fs.readFileSync(path.resolve('./tls', 'server.key')),
		cert: fs.readFileSync(path.resolve('./tls', 'server.cert')),
	},
	app
);

const io = require('socket.io')(httpServer);
const ios = require('socket.io')(httpsServer);

const inputDir = path.resolve(__dirname, 'input');
const listFile = path.resolve(inputDir, 'list.txt');
const outDir = path.join(__dirname, 'output');
const outFile = path.join(outDir, 'out.wav');

function onSocketConnect(socket) {
	socket.on('audio/wav', async (buffer) => {
		console.log('. . . rcvd audio/wav on socket');
		const filename = `${Date.now()}.wav`;
		const inFile = path.resolve(inputDir, filename);
		await fsp.writeFile(inFile, buffer);
		const listItem = 'file ' + filename + '\n';
		await fsp.writeFile(listFile, listItem, { flag: 'a' });
	});
}

io.on('connection', onSocketConnect);
ios.on('connection', onSocketConnect);

function sleep(ms) {
	return new Promise((rsv) => {
		this.tid = setTimeout(rsv, ms);
	});
}

const { cmd } = require('./shell_test/cmd');

async function emitWavToClient(socketIO) {
	const script = `rm -f ${outDir}/* && ffmpeg -f concat -i ${listFile} ${outFile}`;
	while (true) {
		await sleep(1000 * 60 * 2);
		const files = await fsp.readdir(inputDir);
		if (files.length === 0) {
			continue;
		}

		await cmd(script);

		for (const file of files) {
			await fsp.unlink(path.join(inputDir, file));
		}
		const buffer = await fsp.readFile(outFile);
		socketIO.emit('audio/wav-all', buffer);
	}
}

app.get('/collect', async (req, res) => {
	const stat = await fsp.stat(outFile);
	res.setHeader('Content-Type', 'audio/wav');
	res.setHeader('Content-Length', stat.size);
	fs.createReadStream(outFile).pipe(res);
});

const port = process.env.PORT || 1337;
const port2 = 1338;

httpServer.listen(port, () => {
	console.log(`Audio app listening at http://localhost:${port}`);
	emitWavToClient(io);
});

httpsServer.listen(port2, () => {
	console.log(`Audio app also listening at https://localhost:${port2}`);
	emitWavToClient(ios);
});
