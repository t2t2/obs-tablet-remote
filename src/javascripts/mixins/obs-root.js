import OBSRemote from '../obs-remote/index'

export default {

	created: function () {
		this.$obs = new OBSRemote()

		this.$obs.on('socket.close', () => {
			this.obs.connected = false
		})

		this.$obs.on('ready', getObsScenes.bind(this))
		this.$obs.on('scenes.change', getObsScenes.bind(this))
		this.$obs.on('scenes.switch', (state) => {
			this.obs.currentScene = state['scene-name']
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