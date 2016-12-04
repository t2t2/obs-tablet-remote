<template>
	<div class="top-bar">
		<div class="item" :title="obs.version ? 'OBS Websocket Version: ' + obs.version : false">
			Connection: <span :class="connectionStateClass" v-text="connectionStateText"></span>
		</div>
		<div class="space"></div>
		<div class="item">
			<button @click="forceRefresh" title="Force Refresh (In case things get out of sync)"><i class="material-icons">refresh</i></button>
		</div>
		<div class="item">
			<button @click="toggleSettings"><i class="material-icons">settings</i></button>
		</div>
		<div class="item">
			<button @click="toggleFullscreen"><i class="material-icons">fullscreen</i></button>
		</div>
	</div>
</template>

<script>
	import toggleFullscreenMixin from '../mixins/fullscreen'

	export default {
		mixins: [toggleFullscreenMixin],

		computed: {
			connectionStateClass() {
				if (!this.obs.connected) {
					return 'error-text'
				}
				if (this.obs.authRequired) {
					return 'warning-text'
				}
				return 'success-text'
			},
			connectionStateText() {
				if (!this.obs.connected) {
					return 'Down'
				}
				if (this.obs.authRequired) {
					return 'Authenticate'
				}
				return 'Ok'
			}
		},
		methods: {
			forceRefresh() {
				this.$emit('force-refresh')
			},
			toggleSettings() {
				this.$emit('toggle-settings')
			}
		},
		props: {
			obs: {
				type: Object,
				required: true
			}
		}
	}
</script>
