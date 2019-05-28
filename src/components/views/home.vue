<template>
	<div class="flex overflow-y-auto flex-col">
		<div class="flex flex-col md:flex-row max-w-5xl self-center">
			<div class="connect-panel md:w-1/3 px-4 py-2">
				<connect @update:query="val => urlArgs = val" />

				<div class="card">
					<div class="card-title">
						<h2>Automatic Login</h2>
					</div>
					<div class="card-content">
						<p class="mb-2 text-sm">
							To automatically connect, bookmark this URL with connection info in URL after #!auto (default values can be skipped)
						</p>
						<label class="label">Current settings:</label>
						<a
							:href="exampleURL"
							class="block break-all mb-2"
							@click.prevent="() => {}"
						>{{ exampleURL }}</a>
						<p class="text-sm">
							To include password add &password={password}. Note that all fields can't include &amp; or =
						</p>
					</div>
				</div>
			</div>
			<div class="md:w-2/3 px-4 py-2">
				<h1 class="text-3xl mb-2">
					OBS Tablet Remote
				</h1>

				<p class="mb-2">
					Control
					<a
						href="https://obsproject.com/"
						target="_blank"
					>OBS Studio</a>
					over the network, on any device with a web browser
				</p>

				<div
					v-if="showHTTPSWarning"
					class="alert warning"
				>
					<h2>Warning: HTTPS Detected</h2>

					<p>It appears like you have loaded this page over a secure connection. While security is cool, obs websocket plugins don't support it and browsers will block the connection. <a :href="httpURL">Click here to attempt to load http version of this page</a></p>
				</div>

				<p class="mb-2">
					To use OBS Tablet Remote make sure you have installed the <a
						href="https://obsproject.com/forum/resources/websocket-plugin.466/"
						target="_blank"
					>Websocket Plugin for OBS Studio</a>. This version has been optimised for version <strong>4.6.0</strong> or newer
				</p>

				<h2 class="text-2xl mb-2">
					Bugs / Feature requests?
				</h2>

				<p class="mb-2">
					Submit new or 👍 existing one at <a
						href="https://github.com/t2t2/obs-tablet-remote/issues"
						target="_blank"
					>GitHub Issues</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import Connect from './connect'

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
		},
		httpURL() {
			return location.href.replace('https://', 'http://')
		},
		showHTTPSWarning() {
			return location.protocol === 'https:'
		}
	}
}
</script>

<style lang="postcss">
@screen md {
	.connect-panel {
		order: 2;
	}
}
</style>
