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

			<p>To use OBS Tablet Remote make sure you have installed the <a href="http://www.obsremote.com/">OBS Remote
				plugin</a>.</p>

			<h2>Automatic Login</h2>

			<p>To automatically connect, bookmark this URL with connection info in URL after #!auto (default values can
				be skipped)</p>

			<label>
				Current settings:
				<input type="text" readonly v-model="exampleURL"/>
			</label>

			<p>To include password add &password={password}. Note that all fields can't include &amp; or =.</p>

			<h2>Bugs / Feature requests?</h2>

			<a href="https://github.com/t2t2/obs-remote-tablet/issues" target="_blank">
				<img src="https://img.shields.io/badge/github-issues-brightgreen.svg?style=flat-square"
				     alt="Github Issues"/>
			</a>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {

		computed: {
			exampleURL:         function () {
				var url = this.baseURL + '#!auto'
				if (this.host) {
					url += '&host=' + this.host
				}
				if (this.port) {
					url += '&port=' + this.port
				}
				return url
			},
		},

		created: function () {
			// Generate baseURL
			this.baseURL = location.origin + location.pathname
		},

		data: function () {
			return {
				baseUrl:         '',
				connectionError: null,
			}
		},

		methods: {
			connectToOBS: function () {
				this.connectionError = null

				this.$root.connectToOBS().catch((error) => {
					this.connectionError = error.reason
					throw error
				})
			},
		},

		props: {
			connecting: Boolean,
			host:       {
				twoWay: true,
			},
			port:       {
				twoWay: true,
			},
		},
	}

</script>