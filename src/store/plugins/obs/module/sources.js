export const state = {
	list: [],
	types: {},
	browsersProperties: {},
	test: null
}

export const actions = {
	'connection/closed'({commit}) {
		commit('sources/reset')
	},
	async 'connection/ready'({dispatch}) {
		return dispatch('sources/reload')
	},
	async 'sources/reload'({commit, dispatch, getters}) {
		const {client} = getters

		const [
			{sources},
			{types}
		] = await Promise.all([
			client.send({'request-type': 'GetSourcesList'}),
			client.send({'request-type': 'GetSourceTypesList'})
		])

		commit('sources/types', types)
		commit('sources/list', sources)

		commit('sources/clearBrowserProperties')
		await Promise.all(getters['sources/browsersSources'].map(
			source => dispatch('sources/updateBrowserProperties', source.name)
		))

		// Retrieve volume & muted status for sources with volume
		await Promise.all(getters['sources/audioSources'].map(
			source => dispatch('sources/updateSourceVolume', source.name)
		))
	},
	async 'sources/updateBrowserProperties'({commit, getters: {client}}, name) {
		const response = await client.send({'request-type': 'GetBrowserSourceProperties', source: name})
		commit('sources/browserProperties', response)
	},
	async 'sources/refreshSceneBrowsers'({dispatch, getters}, name) {
		const sceneSources = getters.scenes.find(scene => scene.name === name).sources
		const sceneBrowserSources = sceneSources.filter(source => isBrowser(source, true))
		await Promise.all(sceneBrowserSources.map(
			source => dispatch('sources/refreshBrowser', source.name)
		))
	},
	async 'sources/refreshBrowser'({commit, getters}, name) {
		const {client} = getters

		const properties = getters['sources/browsersProperties'][name]

		if (properties.fps % 2 === 0) {
			properties.fps++
		} else {
			properties.fps--
		}

		const response = await client.send({'request-type': 'SetBrowserSourceProperties', source: properties.source, fps: properties.fps})
		commit('sources/browserProperties', response)
	},
	async 'sources/mute'({getters: {client}}, {source, mute}) {
		await client.send({'request-type': 'ToggleMute', source, mute})
	},
	async 'sources/volume'({getters: {client}}, {source, volume}) {
		await client.send({'request-type': 'SetVolume', source, volume})
	},
	async 'sources/updateSourceVolume'({commit, getters: {client}}, name) {
		const response = await client.send({'request-type': 'GetVolume', source: name})
		commit('sources/updateAudio', response)
	},
	async 'event/SourceMuteStateChanged'({commit}, {sourceName, muted}) {
		commit('sources/updateAudio', {name: sourceName, muted})
	},
	async 'event/SourceVolumeChanged'({commit}, {sourceName, volume}) {
		commit('sources/updateAudio', {name: sourceName, volume})
	}
}

export const mutations = {
	'sources/list'(state, sources) {
		state.list = sources.map(source => ({
			...source,
			volume: undefined,
			muted: undefined
		}))
	},
	'sources/reset'(state) {
		state.list = []
		state.types = {}
	},
	'sources/types'(state, types) {
		state.types = {}
		types.forEach(type => {
			state.types[type.typeId] = type
		})
	},
	'sources/browserProperties'(state, response) {
		const {status, 'message-id': messageId, ...properties} = response

		if (Object.prototype.hasOwnProperty.call(state.browsersProperties, properties.source)) {
			state.browsersProperties[properties.source] = Object.assign(
				state.browsersProperties[properties.source], properties
			)
		} else {
			state.browsersProperties[properties.source] = properties
		}
	},
	'sources/clearBrowserProperties'(state) {
		state.browsersProperties = {}
	},
	'sources/updateAudio'(state, {muted, name, volume}) {
		const source = state.list.find(source => source.name === name)
		if (!source) {
			return
		}

		if (muted !== undefined) {
			source.muted = muted
		}

		if (volume !== undefined) {
			source.volume = volume
		}
	},
	'sources/test'(state, value) {
		state.test = value
	}
}

export const getters = {
	'sources/browsersSources'(state) {
		return state.list.filter(source => isBrowser(source))
	},
	'sources/browsersProperties'(state) {
		return state.browsersProperties
	},
	'sources/audioSources'(state) {
		return state.list.filter(source => sourceHasAudio(source, state.types))
	}
}

function sourceHasAudio(source, types) {
	const def = types[source.typeId]

	return def && def.caps && def.caps.hasAudio
}

function isBrowser(source, isSceneItem = false) {
	if (isSceneItem) {
		return source.type === 'browser_source'
	}

	return source.typeId === 'browser_source'
}
