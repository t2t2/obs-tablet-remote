export function activeView(state) {
	if (state.obs.connection === 'ok') {
		return 'dashboard'
	}

	return 'home'
}
