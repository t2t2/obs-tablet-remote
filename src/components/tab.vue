<template>
	<div class="flex flex-grow overflow-hidden">
		<Panel
			v-if="rootPanel"
			:id="tab.root"
			:panel="rootPanel"
			:depth="0"
		/>
	</div>
</template>

<script>
import {mapState} from 'vuex'

import Panel from './panels'

export default {
	components: {
		Panel
	},
	props: {
		tab: {
			type: Object,
			required: true
		}
	},
	computed: {
		...mapState('layout', {
			rootPanel(state) {
				return state.panels[this.tab.root]
			}
		})
	}
}
</script>
