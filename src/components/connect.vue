<template>
	<div>
		<div class="alert error" v-if="error">{{ error.message }}</div>
		<form @submit.prevent="connect" v-if="!needAuth">
			<h2>Connect</h2>
			<label>
				Host
				<input type="text" placeholder="localhost (Current computer)" v-model="host">
			</label>
			<label>
				Port
				<input type="number" placeholder="4444" v-model="port">
			</label>
			<button :disabled="connecting" v-text="connecting ? 'Connecting...' : 'Connect'"></button>
		</form>
		<form @submit.prevent="login" v-if="needAuth">
			<h2>Password required</h2>
			<label>
				Password
				<input type="password" v-model="password">
			</label>
			<button :disabled="authenticating" v-text="authenticating ? 'Checking...' : 'Log In'"></button>
		</form>
	</div>
</template>

<script>
	import {mapState} from 'vuex'

	import {parseHashBang} from '../util'

	export default {
		data() {
			const data = {
				authenticating: false,
				connecting: false,
				error: null,
				host: '',
				password: '',
				port: 4444
			}

			const vars = parseHashBang()
			if (vars.host) {
				data.host = vars.host
			} else {
				data.host = this.$store.state.settings.defaultHost
			}
			if (vars.port) {
				data.port = parseInt(vars.port, 10)
			} else {
				data.port = this.$store.state.settings.defaultPort
			}
			if (vars.password) {
				data.password = vars.password
			}
			return data
		},
		computed: {
			...mapState('obs', {
				needAuth: state => state.connection === 'auth'
			}),
			urlified() {
				let url = ''
				if (this.host) {
					url += '&host=' + this.host
				}
				if (this.port && this.port !== 4444) {
					url += '&port=' + this.port
				}
				return url
			}
		},
		watch: {
			'urlified': {
				handler (newValue) {
					this.$emit('update:query', newValue)
				},
				immediate: true
			}
		},
		methods: {
			async connect() {
				this.connecting = true
				this.error = null
				try {
					await this.$store.dispatch('obs/connect', {
						host: this.host.length ? this.host : undefined,
						port: this.port
					})
					if (this.host.length) {
						this.$store.commit('settings/set', {
							key: 'defaultHost',
							value: this.host
						})
					}
					if (this.port) {
						this.$store.commit('settings/set', {
							key: 'defaultPort',
							value: this.port
						})
					}
				} catch (err) {
					this.error = err
				}
				this.connecting = false
			},
			async login() {
				if (this.password.length === 0) {
					return
				}

				this.authenticating = true
				this.error = null
				try {
					await this.$store.dispatch('obs/authenticate', {
						password: this.password
					})
				} catch (err) {
					this.error = err
				}
				this.authenticating = false
			}
		}
	}

</script>
