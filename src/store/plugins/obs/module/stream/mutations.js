import {updateStateKey} from '../../../../../util'

const setBytesPerSec = updateStateKey('bytesPerSec')
const setFps = updateStateKey('fps')
const setKbitsPerSec = updateStateKey('kbitsPerSec')
const setNumDroppedFrames = updateStateKey('numDroppedFrames')
const setNumTotalFrames = updateStateKey('numTotalFrames')
const setRecording = updateStateKey('recording')
const setRecTimecode = updateStateKey('recTimecode')
const setStrain = updateStateKey('strain')
const setStreaming = updateStateKey('streaming')
const setStreamTimecode = updateStateKey('streamTimecode')
const setTotalStreamTime = updateStateKey('totalStreamTime')

function streamReset(state) {
	setStreaming(state, false)
	setRecording(state, false)
	setBytesPerSec(state, 0)
	setKbitsPerSec(state, 0)
	setStrain(state, 0)
	setTotalStreamTime(state, 0)
	setNumTotalFrames(state, 0)
	setNumDroppedFrames(state, 0)
	setFps(state, 0)
}

function streamStatus(state, status) {
	setStreaming(state, status.streaming)
	setRecording(state, status.recording)
	setBytesPerSec(state, status['bytes-per-sec'])
	setKbitsPerSec(state, status['kbits-per-sec'])
	setStrain(state, status.strain)
	setTotalStreamTime(state, status['total-stream-time'])
	setNumTotalFrames(state, status['num-total-frames'])
	setNumDroppedFrames(state, status['num-dropped-frames'])
	setFps(state, status.fps)
	setStreamTimecode(state, status['stream-timecode'])
	setRecTimecode(state, status['rec-timecode'])
}

function heartbeat(state, status) {
	const {stats} = status
	setStreaming(state, status.streaming)
	setRecording(state, status.recording)
	setFps(state, stats.fps)
	setRecTimecode(state, status['rec-timecode'])
	setStreamTimecode(state, status['stream-timecode'])
}

export default {
	'stream/reset': streamReset,
	'stream/status': streamStatus,
	'stream/heartbeat': heartbeat,
	'stream/set/recording': setRecording,
	'stream/set/recTimecode': setRecTimecode,
	'stream/set/streaming': setStreaming,
	'stream/set/streamTimecode': setStreamTimecode
}
