export default {
	state: {
		current: null,
		preview: null,
		list: []
	},
	actions: {
		'connection/closed'({commit}) {
			commit('scenes/reset')
		},
		async 'connection/ready'({dispatch}) {
			return dispatch('scenes/reload')
		},
		async 'scenes/reload'({commit, getters: {client}, state}) {
			const {'current-scene': current, scenes} = await client.send({'request-type': 'GetSceneList'})

			commit('scenes/list', {scenes})
			commit('scenes/current', current)

			if (state.stream.studioMode === true) {
				const {name: preview} = await client.send({'request-type': 'GetPreviewScene'})
				commit('scenes/preview', preview)
			}
		},
		async 'scenes/current'({getters: {client}}, {name}) {
			return client.send({'request-type': 'SetCurrentScene', 'scene-name': name})
		},
		async 'scenes/preview'({getters: {client}}, {name}) {
			return client.send({'request-type': 'SetPreviewScene', 'scene-name': name})
		},
		async 'sources/render'({getters: {client}}, {scene, source, render}) {
			return client.send({
				'request-type': 'SetSourceRender',
				'scene-name': scene,
				source,
				render
			})
		},
		'event/SwitchScenes'({commit}, data) {
			const {'scene-name': current} = data
			commit('scenes/current', current)
		},
		'event/PreviewSceneChanged'({commit}, data) {
			const {'scene-name': current} = data
			commit('scenes/preview', current)
		},
		'event/ScenesChanged'({dispatch}) {
			return dispatch('scenes/reload')
		},
		'event/SceneItemAdded'({dispatch}) {
			return dispatch('scenes/reload')
		},
		'event/SceneItemRemoved'({dispatch}) {
			return dispatch('scenes/reload')
		},
		// No event from obs-websocket (in 4.2.0 at least) for something like 'SceneItemChanged' (like rename)
		'event/SceneItemVisibilityChanged'({commit}, data) {
			commit('scenes/itemVisibilityChanged', data)
		},
		'event/SceneItemTransformChanged'() {
			// Later mb
		},
		'event/StudioModeSwitched'({commit, state}, {'new-state': status}) {
			if (status === true) {
				commit('scenes/preview', state.current)
			}

			if (status === false) {
				commit('scenes/clearPreview')
			}
		},
		'event/TransitionEnd'({commit}, data) {
			const {'to-scene': current} = data
			commit('scenes/current', current)
		}
	},
	getters: {
		currentScene(state) {
			return state.list.find(scene => scene.name === state.current)
		},
		previewScene(state) {
			return state.list.find(scene => scene.name === state.preview)
		},
		previewOrCurrentScene(state) {
			const name = state.preview || state.current
			return state.list.find(scene => scene.name === name)
		},
		scenes(state) {
			return state.list
		}
	},
	mutations: {
		'scenes/current'(state, name) {
			state.current = name
		},
		'scenes/preview'(state, name) {
			state.preview = name
		},
		'scenes/clearPreview'(state) {
			state.preview = null
		},
		'scenes/list'(state, {scenes}) {
			state.list = scenes
		},
		'scenes/reset'(state) {
			state.current = null
			state.list = []
		},
		'scenes/itemVisibilityChanged'(state, {'scene-name': sceneName, 'item-name': sourceName, 'item-visible': render}) {
			const scene = state.list.find(scene => scene.name === sceneName)

			if (scene) {
				const source = scene.sources.find(source => source.name === sourceName)
				if (source) {
					source.render = render
				}
			}
		}
	}
}
