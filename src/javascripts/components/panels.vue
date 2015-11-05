<template>
	<div class="panels">
		<switcher :obs="obs" :settings="settings"></switcher>
		<sources v-if="settings.sources.enabled" :obs="obs" :settings="settings"></sources>
	</div>
</template>

<script type="text/ecmascript-6">
	import sources from './panels/sources.vue'
	import switcher from './panels/switcher.vue'

	export default {
		components: {
			sources,
			switcher,
		},

		props: {
			obs:      Object,
			settings: Object,
		},
	}
</script>