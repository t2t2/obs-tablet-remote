<template>
	<panel-wrapper :content-class="['panel-grid', this.directionClass]" :is-grid="true">
		<template slot="name">{{ this.settings.direction === 'column' ? 'Vertical' : 'Horizontal' }} Splitter</template>
		<panel
			v-for="(panel, id) in childPanels"
			:key="id"
			:panel="panel"
			:id="id"
			:depth="depth + 1"
		/>
		<!-- adding in edit mode -->
		<button v-if="editing" class="add-panel" @click="showAddPanel=true">
			<i class="material-icons">add_box</i>
		</button>
		<overlay v-if="showAddPanel" @overlay-click="showAddPanel=false">
			<panel-list :parent-id="id" :parent-depth="depth" @close="showAddPanel=false" />
		</overlay>

		<div slot="settings">
			<p>Direction:</p>
			<button :class="{'is-inactive': this.settings.direction !== 'row'}" @click="setSetting('direction', 'row')">
				<i class="material-icons md-48">view_column</i>
			</button>
			<button :class="{'is-inactive': this.settings.direction !== 'column'}" @click="setSetting('direction', 'column')">
				<i class="material-icons md-48">view_stream</i>
			</button>
		</div>
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
			directionClass() {
				switch (this.settings.direction) {
					case 'column':
						return 'is-vertical'
					case 'row':
					default:
						return 'is-horizontal'
				}
			},
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
