// tap events
import 'tocca'

import Vue from 'vue'

import template from './switcher.html'

import obsMixIn from '../mixins/obsUser'


export default Vue.extend({
	template,

	mixins: [obsMixIn],

	computed: {
		classes: function () {
			return 'per-row-' + this.settings.switcher.perRow
		},
	},

	data: function () {
		return {
			currentScene: undefined,
			scenes:       [],
		}
	},

	methods: {

		getScenes: function () {
			this.$obs().getSceneList().then((response) => {
				this.scenes = response['scenes'].map(({name}) => {
					return {
						name,
					}
				})

				this.currentScene = response['current-scene']
			})
		},

		switchToScene: function (scene, event) {
			this.$obs().setCurrentScene(scene.name)

			if (event) {
				event.stopPropagation()
				event.preventDefault()
			}
		},
	},

	ready: function () {
		// Changes to scene list
		this.$onObs('scenes.change', () => {
			this.getScenes()
		})

		// changes to current scene
		this.$onObs('scenes.switch', (state) => {
			this.currentScene = state['scene-name']
		})
	},

	props: {
		connectionReady: {},
		settings: {
			type: Object,
		},
	},

	watch: {
		connectionReady: function (state) {
			if (state) {
				this.getScenes()
			} else {
				this.scenes = []
				this.currentScene = undefined
			}
		}
	}
})