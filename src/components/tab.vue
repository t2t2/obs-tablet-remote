<template>
	<div class="tab">
		<panel v-if="rootPanel" :id="tab.root" :panel="rootPanel" :depth="0" />
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
