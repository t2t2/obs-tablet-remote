import Vue from 'vue'

import OBSRemote from '../obs-remote/index'

export default {

	created: function () {
		this.$obs = new OBSRemote()

		if(process.env.NODE_ENV !== 'production') {
			this.$obs.debug = true
		}

		this.$obs.on('socket.close', () => {
			this.obs.connected = false
		})

		this.$obs.on('ready', getObsScenes.bind(this))

		this.$obs.on('scenes.change', getObsScenes.bind(this))

		this.$obs.on('scenes.switch', (state) => {
			this.obs.currentScene = state['scene-name']
		})

		// On source state change
		this.$obs.on('source.change', (state) => {
			// Find current scene
			this.obs.scenes.map((scene) => {
				if(scene.name == this.obs.currentScene) {
					// Find the source
					var sourcesLength = scene.sources.length
					for (var i = 0; i < sourcesLength; i++) {
						if(scene.sources[i].name == state['source-name']) {
							// Replace the source
							scene.sources.splice(i, 1, state.source)
						}
					}
				}
			})
		})
	},

	data: function () {
		return {
			obs: {
				host:     null,
				port:     null,
				password: '',

				authenticating: false,
				authRequired:   null,
				connected:      false,
				connecting:     false,

				currentScene: null,
				scenes:  [],
				version: null,
			},
		}
	},

	destroyed: function () {
		this.$obs.close()
		this.$obs.removeAllListeners()
	},
}

function getObsScenes() {
	this.$obs.getSceneList().then(response => {
		this.obs.currentScene = response['current-scene']
		this.obs.scenes = response.scenes
	})
}