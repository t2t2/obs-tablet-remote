import Ultron from 'ultron'

export default {
	created() {
		Object.defineProperty(this, '$obs', {
			get: () => {
				return this.$root.$refs.app.$obs
			}
		})

		this._obs = new Ultron(this.$obs)
	},

	destroyed() {
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
		$onObs(event, fn) {
			return this._obs.on(event, fn)
		},

		/**
		 * Listens for OBS event once
		 *
		 * @param event
		 * @param fn
		 * @returns {OBSRemote}
		 */
		$onceObs(event, fn) {
			return this._obs.once(event, fn)
		},

		/**
		 * Removes event listener from OBS
		 *
		 * @param event
		 * @param fn
		 * @returns {OBSRemote}
		 */
		$offObs(event, fn) {
			if (fn) {
				return this.$obs.removeListener(event, fn)
			}
			return this._obs.remove(event)
		}
	}
}
