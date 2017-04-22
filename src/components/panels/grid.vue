<template>
	<panel-wrapper content-class="panel-grid" :is-grid="true">
		<template slot="name">Horizontal Splitter</template>
		<panel
			v-for="(panel, id) in childPanels"
			:key="id"
			:panel="panel"
			:id="id"
			:depth="depth + 1"
		/>
		<button v-if="editing" class="add-panel" @click="showAddPanel=true">
			<i class="material-icons">add_box</i>
		</button>
		<overlay v-if="showAddPanel" @overlay-click="showAddPanel=false">
			<panel-list :parent-id="id" :parent-depth="depth" @close="showAddPanel=false" />
		</overlay>
	</panel-wrapper>
</template>

<script>
	import {mapState} from 'vuex'

	import hasChildPanels from '../mixins/has-child-panels'
	import panelMixin from '../mixins/panel'

	import PanelList from '../panel-list'
	import Overlay from '../overlay'

	export default {
		mixins: [hasChildPanels, panelMixin],
		components: {
			PanelList,
			Overlay
		},
		computed: {
			...mapState(['editing']),
			shouldClosePanel() {
				return this.showAddPanel && !this.editing
			}
		},
		data() {
			return {
				showAddPanel: false
			}
		},
		methods: {

		},
		watch: {
			shouldClosePanel(value) {
				if (value) {
					this.showAddPanel = false
				}
			}
		}
	}
</script>
