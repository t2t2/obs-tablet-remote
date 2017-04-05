<template>
	<div>
		<div class="alert error" v-if="error">{{ error.message }}</div>
		<form @submit.prevent="connect" v-if="!needAuth">
			<h2>Connect</h2>
			<label>
				Host
				<input type="text" placeholder="localhost (Current computer)" v-model="host"/>
			</label>
			<label>
				Port
				<input type="number" placeholder="4444" v-model="port"/>
			</label>
			<button :disabled="connecting" v-text="connecting ? 'Connecting...' : 'Connect'"></button>
		</form>
		<form @submit.prevent="login" v-if="needAuth">
			<h2>Password required</h2>
			<label>
				Password
				<input type="password" v-model="password"/>
			</label>
			<button :disabled="authenticating" v-text="authenticating ? 'Checking...' : 'Log In'"></button>
		</form>
	</div>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		computed: {
			...mapState('obs', {
				needAuth: state => state.connection === 'auth'
			})
		},
		data() {
			return {
				authenticating: false,
				connecting: false,
				error: null,
				host: '',
				password: '',
				port: 4444
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
