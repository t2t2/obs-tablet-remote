<template>
	<div class="top-bar">
		<div class="item" :title="obs.version ? 'OBS Remote Version: ' + obs.version : false">
			Connections: <span :class="connectionStateClass" v-text="connectionStateText"></span>
		</div>
		<div class="space"></div>
		<div class="item">
			<button @click="toggleSettings"><i class="material-icons">settings</i></button>
		</div>
		<div class="item">
			<button @click="toggleFullscreen">Full Screen</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import toggleFullscreenMixin from '../mixins/fullscreen'

	export default {
		mixins: [toggleFullscreenMixin],

		computed: {
			connectionStateClass: function () {
				if (!this.obs.connected) {
					return 'error-text'
				}
				if (this.obs.authRequired) {
					return 'warning-text'
				}
				return 'success-text'
			},
			connectionStateText:  function () {
				if (!this.obs.connected) {
					return 'Down'
				}
				if (this.obs.authRequired) {
					return 'Authenticate'
				}
				return 'Ok'
			},
		},

		methods: {
			toggleSettings: function () {
				this.$emit('toggle-settings')
			},
		},

		props: {
			obs: {
				required: true,
			},
		},
	}
</script>