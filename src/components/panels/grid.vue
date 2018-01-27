<template>
	<panel-wrapper
		:content-class="['panel-grid', this.directionClass]"
		:is-grid="true"
		@mouseleave.native="stopResizing"
		@mousemove.native="handleResize"
		@mouseup.native="stopResizing"
		@touchend.native="stopResizing"
		@touchmove.native="handleResize"
	>
		<template slot="name">{{ this.settings.direction === 'column' ? 'Vertical' : 'Horizontal' }} Splitter</template>
		<template v-for="(panel, id, index) in childPanels">
			<div
				v-if="editing && index > 0"
				class="resize-handler"
				draggable="true"
				@mousedown.prevent="startResize($event, index - 1)"
				@touchstart.prevent="startResize($event, index - 1)"
				:key="id + '-resize'"
			>
				<span class="dot"></span>
				<span class="dot"></span>
				<span class="dot"></span>
			</div>
			<panel
				ref="panels"
				:key="id"
				:panel="panel"
				:id="id"
				:depth="depth + 1"
				:style="{flexBasis: (weights[index] || 1) * 100 / childCount + '%'}"
				:data-basis="childCount"
			/>
		</template>
		<!-- adding in edit mode -->
		<button
			ref="addButton"
			v-if="editing"
			class="add-panel"
			@click="showAddPanel=true"
		>
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
	import debounce from 'lodash/debounce'
	import sum from 'lodash/sum'
	import {mapState} from 'vuex'

	import hasChildPanels from '../mixins/has-child-panels'
	import panelMixin from '../mixins/panel'

	import PanelList from '../panel-list'
	import Overlay from '../overlay'

	const MIN_PANEL_SIZE_MULTI = 0.05

	export default {
		components: {
			PanelList,
			Overlay
		},
		mixins: [hasChildPanels, panelMixin],
		data() {
			return {
				dragging: false,
				draggingWeights: null,
				showAddPanel: false
			}
		},
		computed: {
			...mapState(['editing']),
			childCount() {
				return Object.keys(this.childPanels).length
			},
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
			},
			weights() {
				if (this.draggingWeights) {
					return this.draggingWeights
				}
				if (this.settings.weights) {
					return this.settings.weights
				}
				return []
			}
		},
		watch: {
			shouldClosePanel(value) {
				if (value) {
					this.showAddPanel = false
				}
			}
		},
		methods: {
			startResize(e, i) {
				// Get current sizes and set as current value
				const sizeAttr = this.settings.direction === 'row' ? 'width' : 'height'
				const sizes = this.$refs.panels.map(panel => panel.$el.getBoundingClientRect()[sizeAttr])
				const total = sum(sizes)
				const count = sizes.length

				this.dragging = i
				this.draggingWeights = sizes.map(size => size / total * count)
			},
			handleResize(e) {
				if (!this._resizeDebounce) {
					this._resizeDebounce = debounce(this.doResize.bind(this))
				}
				if (this.dragging !== false) {
					e.preventDefault()
					this._resizeDebounce(e)
				}
			},
			stopResizing(e) {
				if (this.dragging !== false) {
					e.preventDefault()

					this.setSetting('weights', this.draggingWeights)

					this.dragging = false
					this.draggingWeights = null
				}
			},
			doResize(e) {
				if (this.dragging !== false) {
					const rects = this.$el.getBoundingClientRect()
					const addButtonRects = this.$refs.addButton.getBoundingClientRect()

					const i = this.dragging
					let mouse
					let base
					let range

					let positionOwner = e
					if (e.targetTouches && e.targetTouches.length > 0) {
						positionOwner = e.targetTouches[0]
					}

					if (this.settings.direction === 'row') {
						mouse = positionOwner.pageX
						base = rects.left
						range = rects.width - addButtonRects.width
					} else {
						mouse = positionOwner.pageY
						base = rects.top
						range = rects.height - addButtonRects.height
					}
					let target = (mouse - base) / range * this.draggingWeights.length

					const targetRange = [0, this.draggingWeights.length]
					this.draggingWeights.forEach((value, index) => {
						if (index < this.dragging) {
							targetRange[0] += value
							return
						}
						if (index - 1 > this.dragging) {
							targetRange[1] -= value
						}
					})

					const minSize = MIN_PANEL_SIZE_MULTI * this.draggingWeights.length
					if (target < targetRange[0] + minSize) {
						target = targetRange[0] + minSize
					} else if (target > targetRange[1] - minSize) {
						target = targetRange[1] - minSize
					}
					const value = target - targetRange[0]
					const nextValue = targetRange[1] - targetRange[0] - value

					this.draggingWeights.splice(i, 2, value, nextValue)
				}
			}
		}
	}
</script>
