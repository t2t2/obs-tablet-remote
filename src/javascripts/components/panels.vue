<template>
	<div class="panels">
		<switcher :obs="obs" :settings="settings"></switcher>
	</div>
</template>

<script type="text/ecmascript-6">
	import switcher from './switcher.vue'

	export default {
		components: {
			switcher,
		},

		props: {
			obs:      Object,
			settings: Object,
		},
	}
</script>