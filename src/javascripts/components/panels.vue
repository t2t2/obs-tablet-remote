<template>
	<div class="panels">
		<switcher :obs="obs" :settings="settings"></switcher>
		<sources v-if="settings.sources.enabled" :obs="obs" :settings="settings" @force-refresh="forceRefresh"></sources>
	</div>
</template>

<script>
	import Sources from './panels/Sources.vue'
	import Switcher from './panels/Switcher.vue'

	export default {
		components: {
			Sources,
			Switcher
		},

		methods: {
			forceRefresh() {
				this.$emit('force-refresh')
			}
		},

		props: {
			obs: Object,
			settings: Object
		}
	}
</script>
