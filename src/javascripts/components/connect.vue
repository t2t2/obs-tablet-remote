<template>
	<div class="connection">
		<div class="alert error" v-if="connectionError" v-text="'Connection Error: ' + connectionError"></div>
		<form class="connection-settings" @submit.prevent="connectToOBS">
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
		<div class="connection-info">
			<h2>Usage Instructions</h2>

			<p>To use OBS Tablet Remote make sure you have installed <a href="https://obsproject.com/forum/resources/websocket-plugin.466/" target="_blank">Websocket Plugin</a> for OBS Studio</p>

			<h2>Automatic Login</h2>

			<p>To automatically connect, bookmark this URL with connection info in URL after #!auto (default values can
				be skipped)</p>

			<label>
				Current settings:
				<input type="text" readonly :value="exampleURL" @click="selectValue" />
			</label>

			<p>To include password add &password={password}. Note that all fields can't include &amp; or =.</p>

			<h2>Bugs / Feature requests?</h2>

			<a href="https://github.com/t2t2/obs-tablet-remote/issues" target="_blank">
				<img src="https://img.shields.io/badge/github-issues-brightgreen.svg?style=flat-square"
				     alt="Github Issues"/>
			</a>
		</div>
	</div>
</template>

<script>
	export default {

		computed: {
			exampleURL() {
				let url = this.baseURL + '#!auto'
				if (this.host) {
					url += '&host=' + this.host
				}
				if (this.port) {
					url += '&port=' + this.port
				}
				return url
			},
			host: {
				get() {
					if (this.userValue.host !== null) {
						return this.userValue.host
					}
					return this.obs.host
				},
				set(value) {
					this.userValue.host = value
				}
			},
			port: {
				get() {
					if (this.userValue.port !== null) {
						return this.userValue.port
					}
					return this.obs.port
				},
				set(value) {
					this.userValue.port = value
				}
			}
		},
		data() {
			return {
				baseURL: location.origin + location.pathname,
				connectionError: null,
				userValue: {
					host: null,
					port: null
				}
			}
		},
		methods: {
			connectToOBS() {
				this.connectionError = null

				const callback = async promise => {
					try {
						await promise
					} catch (err) {
						this.connectionError = err.error
					}
				}
				this.$emit('connect-to-obs', {
					callback,
					host: this.host || undefined,
					port: this.port || undefined
				})
			},
			selectValue(e) {
				e.target.select()
			}
		},
		props: {
			connecting: Boolean,
			obs: Object
		}
	}

</script>
