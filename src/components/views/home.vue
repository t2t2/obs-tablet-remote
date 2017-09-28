<template>
	<div class="is-scrollable">
		<div class="page-home">
			<div class="home-connect">
				<connect @update:query="val => this.urlArgs = val" />
			</div>
			<div class="home-info">
				<h1>OBS Tablet Remote</h1>

				<p>Control <a href="https://obsproject.com/" target="_blank">OBS Studio</a> over the network, on any device with a web browser</p>

				<h2>Usage Instructions</h2>

				<p>To use OBS Tablet Remote make sure you have installed the <a href="https://obsproject.com/forum/resources/websocket-plugin.466/" target="_blank">Websocket Plugin</a> for OBS Studio</p>

				<h2>Automatic Login</h2>

				<p>To automatically connect, bookmark this URL with connection info in URL after #!auto (default values can be skipped)</p>

				<label>
					Current settings:
					<input type="text" readonly :value="exampleURL" @click="selectValue" />
				</label>

				<p>To include password add &password={password}. Note that all fields can't include &amp; or =.</p>

				<h2>Bugs / Feature requests?</h2>

				<a href="https://github.com/t2t2/obs-tablet-remote/issues" target="_blank">Github Issues</a>
			</div>
		</div>
	</div>
</template>

<script>
	import Connect from '../connect'

	export default {
		components: {
			Connect
		},
		data() {
			return {
				urlArgs: ''
			}
		},
		computed: {
			exampleURL() {
				return `${location.origin + location.pathname}#!auto${this.urlArgs}`
			}
		},
		methods: {
			selectValue(e) {
				e.target.select()
			}
		}
	}
</script>
