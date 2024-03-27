import React from 'react'
import { AudioRecorder } from 'react-audio-voice-recorder'

const SpeakSearch = ({ handleAudioSearch })=> {

	return (
		<div className='speak-search'>
			<AudioRecorder
				onRecordingComplete={handleAudioSearch}
				audioTrackConstraints={{
					noiseSuppression: true,
					echoCancellation: true,
				}}
				downloadOnSavePress={false}
				downloadFileExtension='wav'
				showVisualizer={true}
			/>
		</div>
	)
}

export default SpeakSearch