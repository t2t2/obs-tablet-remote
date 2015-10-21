import Ultron from 'ultron'

export default {
	created: function () {
		Object.defineProperty(this, '$obs', {
			get: () => {
				return this.$root.$obs
			}
		})

		this._obs = new Ultron(this.$obs)
	},

	destroyed: function () {
		this._obs.destroy()
	},

	methods: {

		/**
		 * Listens for OBS event
		 *
		 * @param event
		 * @param fn
		 * @returns {OBSRemote}
		 */
		$onObs: function (event, fn) {
			return this._obs.on(event, fn)
		},

		/**
		 * Listens for OBS event once
		 *
		 * @param event
		 * @param fn
		 * @returns {OBSRemote}
		 */
		$onceObs: function (event, fn) {
			return this._obs.once(event, fn)
		},

		/**
		 * Removes event listener from OBS
		 *
		 * @param event
		 * @param fn
		 * @returns {OBSRemote}
		 */
		$offObs: function (event, fn) {
			if(!fn) {
				return this._obs.remove(event)
			} else {
				return this.$obs.removeListener(event, fn)
			}
		},

	},
}