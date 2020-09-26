const depScript = document.createElement('script');
depScript.setAttribute(
	'src',
	'https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js'
);

document.head.append(depScript);

class AudioRecorder {
	constructor(stream) {
		this.stream = stream;
	}

	async start() {
		if (this.stream && this.rec) {
			this.rec.record();
			return;
		}

		if (!this.stream) {
			this.stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: false,
			});
		}

		const AudioContext = window.AudioContext || window.webkitAudioContext;
		const audioContext = new AudioContext();
		const inputNode = audioContext.createMediaStreamSource(this.stream);
		this.rec = new Recorder(inputNode, { numChannels: 1 });

		//start the recording process
		this.rec.record();

		console.log('Recording started');
	}

	async pause() {
		this.rec.stop();
	}

	async stop() {
		clearInterval(this.tid);
		clearTimeout(this.tid);
		this.rec.stop();
		this.stream.getAudioTracks()[0].stop();
		this.stream = null;
		console.log('Recording stopped, stream=null');
	}

	async exportBlob() {
		if (!this.stream || !this.rec) {
			await this.start();
		}

		const promise = new Promise((rsv, rej) => {
			this.rec.exportWAV((blob) => rsv(blob));
		});
		const blob = await promise;
		this.rec.clear();
		// console.log(
		// 	'Recording output blob: ',
		// 	blob,
		// 	' , blobURL: ',
		// 	URL.createObjectURL(blob)
		// );

		return blob;
	}

	repeatlyExportBlob(onComplete, interval = 5000) {
		this.tid = setInterval(async () => {
			const blob = await this.exportBlob();
			onComplete(blob);
		}, interval);
	}

	async *generateBlob(interval = 5000) {
		this.tid = 1;
		while (this.tid) {
			await new Promise((rsv) => {
				this.tid = setTimeout(rsv, interval);
			});
			const blob = await this.exportBlob();
			yield blob;
		}
	}
}
