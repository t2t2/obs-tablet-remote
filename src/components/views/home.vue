<template>
	<div class="is-scrollable">
		<div class="page-home">
			<div class="home-connect">
				<connect />
			</div>
			<div class="home-info">
				<h1>OBS Tablet Remote</h1>

				<p>Control <a href="https://obsproject.com/" target="_blank">OBS Studio</a> over the network, on any device with a web browser</p>

				<h2>Usage Instructions</h2>

				<p>To use OBS Tablet Remote make sure you have installed the <a href="https://obsproject.com/forum/resources/websocket-plugin.466/" target="_blank">Websocket Plugin</a> for OBS Studio</p>

				<h2>Bugs / Feature requests?</h2>

				<a href="https://github.com/t2t2/obs-tablet-remote/issues" target="_blank">
					<img
						src="https://img.shields.io/badge/github-issues-brightgreen.svg?style=flat-square"
						alt="Github Issues"
					>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	import Connect from '../connect'

	export default {
		components: {
			Connect
		}
	}
</script>
