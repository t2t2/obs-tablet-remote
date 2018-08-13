export default {
	state: {
		list: []
	},
	actions: {
		'connection/closed'({commit}) {
			commit('mixer/reset')
		},
		async 'connection/ready'({dispatch}) {
			return dispatch('mixer/reload')
		},
		async 'mixer/reload'({commit, getters: {client}}) {
			const {sources} = await client.send({'request-type': 'GetSourcesList'})
			commit('mixer/list', {sources})
		},
		async 'mixer/toggle-mute'({dispatch, getters: {client}}, {name}) {
			await client.send({'request-type': 'ToggleMute', 'source': name})
			return dispatch('mixer/reload')
		},
		async 'mixer/mute-status'({getters: {client}}, {name}) {
			client.send({'request-type': 'GetMute', 'source': name})
			.then( data => {
				const elm = document.getElementById(data.name.replace(/\W/g,'-'))
				elm.classList.remove("is-active", "is-inactive")
				elm.classList.add(data.muted ? "is-inactive" : "is-active")
			})
		},
		'event/SceneItemAdded'({dispatch}) {
			return dispatch('mixer/reload')
		},
		'event/SceneItemRemoved'({dispatch}) {
			return dispatch('mixer/reload')
		},
		'event/ScenesChanged'({dispatch}) {
			return dispatch('mixer/reload')
		}
	},
	mutations: {
		'mixer/list'(state, {sources}) {
			const audioSources = sources.filter(source => source.typeId.includes("wasapi"))
			state.list = audioSources
		},
		'mixer/reset'(state) {
			state.list = []
		}
	}
}
