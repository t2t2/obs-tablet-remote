<template>
	<panel-wrapper content-class="panel-grid" :is-grid="true">
		<template slot="name">Horizontal Splitter</template>
		<panel
			v-for="(panel, id) in childPanels"
			:key="id"
			:panel="panel"
			:id="id"
		/>
	</panel-wrapper>
</template>

<script>
	import hasChildPanels from '../mixins/has-child-panels'
	import panelMixin from '../mixins/panel'

	export default {
		mixins: [hasChildPanels, panelMixin]
	}
</script>
