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
			const sourcesT = await client.send({'request-type': 'GetSourceTypesList'})
			commit('mixer/list', {'srcs': sources, 'srcsT': sourcesT.types.filter(source => source.type == "input")})
		},
		async 'mixer/toggle-mute'({dispatch, getters: {client}}, {name}) {
			await client.send({'request-type': 'ToggleMute', 'source': name})
			return dispatch('mixer/reload')
		},
		async 'mixer/mute-status'({getters: {client}}, {name}) {
			client.send({'request-type': 'GetMute', 'source': name})
			.then( data => {
				const elm = document.getElementById(data.name.replace(/\W/g,'-'))
				const but = document.getElementById("button_" + data.name.replace(/\W/g,'-'))
				elm.classList.remove("is-active", "is-inactive")
				elm.classList.add(data.muted ? "is-inactive" : "is-active")
				but.textContent = data.muted ? "unmute" : "mute"
			})
		},
		async 'mixer/get-volume' ({dispatch, getters: {client}}, {name}) {
			client.send({'request-type': 'GetVolume', 'source': name}).then ( data => {
				const elm = document.getElementById("slider_" + data.name.replace(/\W/g, '-'))
				elm.value = data.volume
			})
		},
		async 'mixer/set-volume' ({dispatch, getters: {client}}, {name}) {
			const volume = document.getElementById("slider_" + name.replace(/\W/g, '-')).value
			console.log("name: " + name + "volume: " + volume)

			client.send({'request-type': 'SetVolume', 'source': name, 'volume': parseFloat(volume)})
			return dispatch('mixer/reload')
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
		'mixer/list'(state, {'srcs': sources, 'srcsT': sourcesT}) {
			const audioSourceTypes = sourcesT.filter(s => s.caps.hasAudio == true);
			let inputs = [];
			audioSourceTypes.forEach(function(s) {
				inputs.push(s.typeId)
			})
			const audioSources = sources.filter(source => inputs.indexOf(source.typeId) > -1)
			state.list = audioSources
		},
		'mixer/reset'(state) {
			state.list = []
		}
	}
}
