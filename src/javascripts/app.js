import Vue from 'vue'
import OBSRemote from './obs-remote/index'

import template from './app.html'

import modal from './components/modal'
import switcher from './components/switcher'

import store from './storage'

export default Vue.extend({
	template,

	components: {
		modal,
		switcher,
	},

	computed: {
		connectionStateClass: function () {
			if (!this.obs.connected) {
				return 'error-text'
			}
			if (this.obs.authRequired) {
				return 'warning-text'
			}
			return 'success-text'
		},
		connectionStateText:  function () {
			if (!this.obs.connected) {
				return 'Down'
			}
			if (this.obs.authRequired) {
				return 'Authenticate'
			}
			return 'Ok'
		},
		exampleURL:           function () {
			var url = this.baseURL + '#!auto'
			if (this.obs.host) {
				url += '&host=' + this.obs.host
			}
			if (this.obs.port) {
				url += '&port=' + this.obs.port
			}
			return url
		},
		obsConnectionReady:   function () {
			return this.obs.connected && !this.obs.authRequired
		},
	},

	data: function () {
		return {
			autoConnecting:      false,
			authenticationError: undefined,
			baseURL:             '',
			connectionError:     undefined,
			obs:                 {
				authenticating: false,
				authRequired:   null,
				connecting:     false,
				connected:      false,
				host:           null,
				password:       '',
				port:           null,
				version:        null,
			},
		}
	},

	methods: {
		authOBS: function () {
			if (this.obs.authenticating) return

			this.obs.authenticating = true
			this.obs.authenticationError = undefined

			return this.$obs.login(this.obs.password).then((response) => {
				this.obs.authenticating = false
				this.obs.authRequired = false

				return response
			}, (error) => {
				this.obs.authenticating = false
				this.authenticationError = error

				throw error
			})
		},

		connectToOBS: function ({ autoConnecting = false }) {
			if (this.obs.connecting) return

			this.resetOBS()

			var host = this.obs.host, port = this.obs.port;

			if (!host) host = 'localhost'
			if (!port) port = 4444

			this.$obs.host = host
			this.$obs.port = port
			this.obs.connecting = true

			return this.$obs.connect().then(({version, auth}) => {
				this.obs.connected = true
				this.obs.connecting = false
				this.obs.authRequired = auth
				this.obs.version = version

				// Save last successful login to storage if not automatic
				if (!autoConnecting) {
					this.$store('obs.host', host != 'localhost' ? host : null)
					this.$store('obs.port', port != 4444 ? port : null)
				}

				return {version, auth}
			}, (error) => {
				this.connectionError = error.reason
				this.obs.connecting = false
				throw error
			})
		},

		doAutoLogin: function () {
			this.autoConnecting = true
			return this.connectToOBS({autoConnecting: true}).then(({auth}) => {
				if (auth) {
					return this.authOBS()
				}
				return true
			}).then(() => {
				this.autoConnecting = false
			}, (error) => {
				this.autoConnecting = false
			})
		},

		resetOBS: function () {
			if (this.$obs) {
				this.$obs.close()
			}

			this.connectionError = undefined
			this.obs.authRequired = null
			this.obs.connecting = false
			this.obs.connected = false
			this.obs.version = null
		},

		toggleFullscreen: function () {
			var docElm = document.documentElement,
				isFullScreen = document.fullscreen || document.mozFullScreen
					|| document.webkitIsFullScreen || document.msFullscreenElement,
				goFullScreen = docElm.requestFullscreen || docElm.mozRequestFullScreen
					|| docElm.webkitRequestFullScreen || docElm.msRequestFullscreen,
				leaveFullScreen = document.exitFullscreen || document.mozCancelFullScreen
					|| document.webkitCancelFullScreen || document.msExitFullscreen;

			if (!isFullScreen) {
				goFullScreen.apply(docElm);
			} else {
				leaveFullScreen.apply(document);
			}
		}
	},

	created: function () {
		this.$obs = new OBSRemote()

		this.$obs.on('socket.close', () => {
			this.obs.connected = false
		})
	},

	ready: function () {
		this.$store = store

		// Generate baseURL
		this.baseURL = location.origin + location.pathname

		// Check for auto-login
		if (location.hash.indexOf('#!')) {
			// https://gist.github.com/zaus/5201739
			let vars = {}, hashes = location.hash.slice(location.hash.indexOf('#!') + 2).split('&');

			for (let i = hashes.length; i--;) {
				let hash = hashes[i].split('=')

				vars[hash[0]] = hash.length > 1 ? hash[1] : null
			}

			if (vars.host) {
				this.obs.host = vars.host
			}
			if (vars.port) {
				this.obs.port = vars.port
			}
			if (vars.password) {
				this.obs.password = vars.password
			}
			if ('auto' in vars) {
				this.doAutoLogin()
			}
		}

		// If not using auto-login load obs settings
		if (!this.autoConnecting) {
			var storedHost = this.$store('obs.host')
			if (!this.obs.host && storedHost) {
				this.obs.host = storedHost
			}

			var storedPort = this.$store('obs.port')
			if (!this.obs.port && storedPort) {
				this.obs.port = storedPort
			}
		}
	},
})