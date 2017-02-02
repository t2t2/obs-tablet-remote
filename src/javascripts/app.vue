<template>
	<div class="container">
		<top-bar :obs="obs" @toggle-settings="toggleSettings" @force-refresh="refreshScenes"></top-bar>
		<panels v-if="obsConnectionReady" :obs="obs" :settings="settings" @force-refresh="refreshScenes"></panels>
		<!-- Modals -->
		<modal modal-class="wide" v-if="!autoConnecting && !obs.connected">
			<connect :connecting="obs.connecting" :obs="obs" @connect-to-obs="connectToOBS"></connect>
		</modal>
		<modal v-if="!autoConnecting && obs.authRequired">
			<authentication :authenticating="obs.authenticating" :obs="obs" @auth-obs="authOBS"></authentication>
		</modal>
		<modal v-if="autoConnecting">
			<h2>Connecting...</h2>
		</modal>
		<modal v-if="settingsOpen" modal-class="wide" @overlay-click="toggleSettings">
			<settings :obs="obs" :settings="settings" @update-setting="updateSetting"></settings>
		</modal>
	</div>
</template>

<script>
	import setPath from 'lodash/set'

	import Authentication from './components/authentication'
	import Connect from './components/connect'
	import Modal from './components/modal'
	import Panels from './components/panels'
	import Settings from './components/settings'
	import TopBar from './components/TopBar'

	import ObsRootMixin from './mixins/obs-root'
	import SettingsMixin from './mixins/settings'

	export default {
		mixins: [ObsRootMixin, SettingsMixin],
		components: {
			Authentication,
			Connect,
			Modal,
			Panels,
			Settings,
			TopBar
		},
		computed: {
			obsConnectionReady() {
				return this.obs.connected && !this.obs.authRequired
			}
		},
		data() {
			return {
				autoConnecting: false,
				settingsOpen: false
			}
		},
		methods: {
			authOBS({
				password = null,
				callback = null
			}) {
				if (this.obs.authenticating) {
					return
				}

				this.obs.authenticating = true

				const promise = this.$obs.login(password).then(response => {
					this.obs.authenticating = false
					this.obs.authRequired = false

					return response
				}, err => {
					this.obs.authenticating = false

					throw err
				})
				if (callback) {
					callback(promise)
				}
				return promise
			},

			connectToOBS({
				autoConnecting = false,
				callback = null,
				host = 'localhost',
				port = 4444
			} = {}) {
				if (this.obs.connecting) {
					return
				}

				this.resetOBS()

				this.$obs.host = this.obs.host = host
				this.$obs.port = this.obs.port = port
				this.obs.connecting = true

				const promise = this.$obs.connect().then(({version, auth}) => {
					this.obs.connected = true
					this.obs.connecting = false
					this.obs.authRequired = auth
					this.obs.version = version

					// Save last successful login to storage if not automatic
					if (!autoConnecting) {
						this.$store('obs.host', host === 'localhost' ? undefined : host)
						this.$store('obs.port', port === 4444 ? undefined : port)
					}

					return {version, auth}
				}, err => {
					console.log(err)
					this.obs.connecting = false
					throw err
				})

				if (callback) {
					callback(promise)
				}
				return promise
			},

			doAutoLogin() {
				this.autoConnecting = true
				return this.connectToOBS({
					autoConnecting: true,
					host: this.obs.host,
					port: this.obs.port
				}).then(({auth}) => {
					if (auth) {
						return this.authOBS({
							password: this.obs.password
						})
					}
					return true
				}).then(() => {
					this.autoConnecting = false
				}, () => {
					this.autoConnecting = false
				})
			},

			resetOBS() {
				if (this.$obs) {
					this.$obs.close()
				}

				this.obs.authRequired = null
				this.obs.connecting = false
				this.obs.connected = false
				this.obs.version = null
			},

			toggleSettings() {
				this.settingsOpen = !this.settingsOpen
			},
			updateSetting(key, value) {
				// lodash okay here cause it's predefined
				setPath(this.settings, key, value)
			}
		},

		mounted() {
			// Check for auto-login
			if (location.hash.indexOf('#!') === 0) {
				// https://gist.github.com/zaus/5201739
				const vars = {}
				const hashes = location.hash.slice(location.hash.indexOf('#!') + 2).split('&')

				for (let i = hashes.length; i--;) {
					const hash = hashes[i].split('=')

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
				const storedHost = this.$store('obs.host')
				if (!this.obs.host && storedHost) {
					this.obs.host = storedHost
				}

				const storedPort = this.$store('obs.port')
				if (!this.obs.port && storedPort) {
					this.obs.port = storedPort
				}
			}
		}
	}

</script>
