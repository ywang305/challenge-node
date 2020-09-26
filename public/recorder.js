const awesomeScriptTag = document.createElement('script');
awesomeScriptTag.setAttribute(
	'src',
	'https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js'
);

document.head.appendChild(awesomeScriptTag);

// demo code
//webkitURL is deprecated but nevertheless
var URL = window.URL || window.webkitURL;

let gumStream; //stream from getUserMedia()
let rec; //Recorder.js object

var recordButton = document.getElementById('recordButton');
var stopButton = document.getElementById('stopButton');
var pauseButton = document.getElementById('pauseButton');

//add events to those 2 buttons
recordButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);
pauseButton.addEventListener('click', pauseRecording);

function startRecording() {
	console.log('recordButton clicked');

	/*
		Simple constraints object, for more advanced audio features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/

	var constraints = { audio: true, video: false };

	/*
    	We're using the standard promise based getUserMedia() 
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

	navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
		const AudioContext = window.AudioContext || window.webkitAudioContext;
		const audioContext = new AudioContext();
		gumStream = stream;
		const inputNode = audioContext.createMediaStreamSource(stream);
		rec = new Recorder(inputNode, { numChannels: 1 });

		//start the recording process
		rec.record();

		console.log('Recording started');
	});
}

function pauseRecording() {
	console.log('pauseButton clicked rec.recording=', rec.recording);
	if (rec.recording) {
		//pause
		rec.stop();
		pauseButton.innerHTML = 'Resume';
	} else {
		//resume
		rec.record();
		pauseButton.innerHTML = 'Pause';
	}
}

function stopRecording() {
	console.log('stopButton clicked');

	//disable the stop button, enable the record too allow for new recordings
	stopButton.disabled = true;
	recordButton.disabled = false;
	pauseButton.disabled = true;

	//reset button just in case the recording is stopped while paused
	pauseButton.innerHTML = 'Pause';

	//tell the recorder to stop the recording
	rec.stop();

	//stop microphone access
	gumStream.getAudioTracks()[0].stop();

	//create the wav blob and pass it on to createDownloadLink
	rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {
	const blobUrl = URL.createObjectURL(blob);
}
