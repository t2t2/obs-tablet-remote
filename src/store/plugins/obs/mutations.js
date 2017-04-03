export function connectionStarting(state) {
	state.connection = 'connecting'
}

export function connectionStarted(state) {
	state.connection = 'connected'
}

export function connectionAuthNeeded(state) {
	state.connection = 'auth'
}

export function connectionReady(state) {
	state.connection = 'ok'
}

export function connectionClosed(state) {
	state.connection = false
}
