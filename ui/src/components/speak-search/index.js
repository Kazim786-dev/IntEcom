import React from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

const SpeakSearch = ({
	handleAudioSearch
})=> {

	const addAudioElement = (blob) => {
		const url = URL.createObjectURL(blob);
		const audio = document.createElement('audio');
		audio.src = url;
		audio.controls = true;
		document.body.appendChild(audio);
	};

	return (
		<div className='speak-search'>
			<AudioRecorder
				onRecordingComplete={handleAudioSearch}
				audioTrackConstraints={{
					noiseSuppression: true,
					echoCancellation: true,
				}}
				downloadOnSavePress={false}
				downloadFileExtension='mp3'
				showVisualizer={true}
			/>
		</div>
	);
}

export default SpeakSearch;