<template>
	<div class="container">
		<top-bar :obs="obs" @toggle-settings="toggleSettings"></top-bar>
		<panels v-if="obsConnectionReady" :obs="obs" :settings="settings"></panels>
		<!-- Modals -->
		<modal modal-class="wide" v-if="!autoConnecting && !obs.connected">
			<connect :connecting="obs.connecting" :host.sync="obs.host" :port.sync="obs.port"></connect>
		</modal>
		<modal v-if="!autoConnecting && obs.authRequired">
			<authentication :authenticating="obs.authenticating" :password.sync="obs.password"></authentication>
		</modal>
		<modal v-if="autoConnecting">
			<h2>Connecting...</h2>
		</modal>
		<modal v-if="settingsOpen" modal-class="wide" @overlay-click="toggleSettings">
			<settings :settings.sync="settings"></settings>
		</modal>
	</div>
</template>

<script type="text/ecmascript-6">
	import authentication from './components/authentication.vue'
	import connect from './components/connect.vue'
	import modal from './components/modal.vue'
	import panels from './components/panels.vue'
	import settings from './components/settings.vue'
	import topBar from './components/top-bar.vue'

	import ObsRootMixin from './mixins/obs-root.js'

	import store from './storage'
	import defaultsDeep from 'lodash/object/defaultsDeep'

	var defaultSettings = function () {
		return {
			sources: {
				enabled: false,
			},
			switcher: {
				enabled: true,
				perRow:  4,
			},
		}
	}


	export default {
		components: {
			authentication,
			connect,
			modal,
			panels,
			settings,
			topBar,
		},

		computed: {
			obsConnectionReady: function () {
				return this.obs.connected && !this.obs.authRequired
			},
		},

		data: function () {
			var data = {
				autoConnecting: false,
				settingsOpen:   false,
			}

			data.settings = defaultSettings()

			return data
		},

		mixins: [ObsRootMixin],

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

					throw error
				})
			},

			connectToOBS: function ({ autoConnecting = false } = {}) {
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

			toggleSettings: function () {
				this.settingsOpen = !this.settingsOpen
			},
		},

		ready: function () {
			this.$store = store

			// Load last settings
			this.settings = defaultsDeep({}, this.$store('settings'), defaultSettings())

			// Check for auto-login
			if (location.hash.indexOf('#!') == 0) {
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

		watch: {
			'settings': {
				handler: function (newValue) {
					this.$store('settings', newValue)
				},
				deep:    true
			},
		},
	}

</script>