export default {
	created: function () {
		this._obsListeners = {}
	},

	destroyed: function () {
		this.$offObs()
	},

	methods: {

		/**
		 * Gets OBS instance
		 * @returns {OBSRemote}
		 */
		$obs: function () {
			return this.$root.$obs;
		},

		/**
		 * Listens for OBS event
		 *
		 * @param event
		 * @param fn
		 * @returns {OBSRemote}
		 */
		$onObs: function (event, fn) {
			(this._obsListeners[event] = this._obsListeners[event] || []).push(fn)
			return this.$obs().on(event, fn)
		},

		/**
		 * Listens for OBS event once
		 *
		 * @param event
		 * @param fn
		 * @returns {OBSRemote}
		 */
		$onceObs: function (event, fn) {
			var that = this;

			function on() {
				that.$offObs(event, on);
				fn.apply(this, arguments);
			}

			on.fn = fn;
			return this.$onObs(event, on);
		},

		/**
		 * Removes event listener from OBS
		 *
		 * @param event
		 * @param fn
		 * @returns {OBSRemote}
		 */
		$offObs: function (event, fn) {
			// All events
			if (arguments.length == 0) {
				Object.keys(this._obsListeners).forEach((event) => {
					this.$offObs(event)
				})
				this._obsListeners = {}
				return this.$obs();
			}
			// Just an event
			let callbacks = this._obsListeners[event]
			if (!callbacks) return this.$obs();

			for (var i = callbacks.length; i--;) {
				let cb = callbacks[i]

				if(!fn || cb == fn || cb.fn == fn) {
					this.$obs.off(event, cb)
					callbacks.splice(i, 1)
					// i is ok since it keeps lowering the index
				}
			}
			return this.$obs();
		},

	},
}