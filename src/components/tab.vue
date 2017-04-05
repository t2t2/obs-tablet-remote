<template>
	<div class="tab">
		<panel v-if="rootPanel" :id.prop="tab.root" :panel.prop="rootPanel" :root.prop="true" />
	</div>
</template>

<script>
	import {mapState} from 'vuex'

	import Panel from './panels'

	export default {
		components: {
			Panel
		},
		computed: {
			...mapState('layout', {
				rootPanel(state) {
					return state.panels[this.tab.root]
				}
			})
		},
		props: {
			tab: Object
		}
	}
</script>
