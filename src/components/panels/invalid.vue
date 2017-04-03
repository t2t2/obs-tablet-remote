<template>
	<panel-wrapper>
		<template slot="name">Unknown Panel</template>
		404 PANEL NOT FOUND {{ panel.type }}
	</panel-wrapper>
</template>

<script>
	import panelMixin from '../mixins/panel'

	export default {
		mixins: [panelMixin]
	}
</script>
