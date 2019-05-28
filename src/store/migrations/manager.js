const SETTINGS_MIGRATIONS = [
	settings => ({
		...settings,
		theme: 'default'
	})
]
const SETTINGS_CURRENT_VERSION = 1

export default function (store) {
	// Settings migrations
	const settingsVersion = store.state.settings.version || 0
	if (settingsVersion < SETTINGS_CURRENT_VERSION) {
		const settings = SETTINGS_MIGRATIONS.reduce(
			(settings, fn) => fn(settings, store),
			store.state.settings
		)
		settings.version = SETTINGS_CURRENT_VERSION

		store.replaceState({
			...store.state,
			settings
		})
	}
}
