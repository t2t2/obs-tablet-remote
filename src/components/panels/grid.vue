<template>
	<panel-wrapper
		:content-class="['flex items-stretch w-full h-full', directionClass]"
		:is-grid="true"
		@mouseleave.native="stopResizing"
		@mousemove.native="handleResize"
		@mouseup.native="stopResizing"
		@touchend.native="stopResizing"
		@touchmove.native="handleResize"
	>
		<template #name>
			{{ isHorizontal ? 'Horizontal' : 'Vertical' }} Splitter
		</template>

		<template v-for="(panel, id, index) in childPanels">
			<div
				v-if="editing && index > 0"
				:key="id + '-resize'"
				:class="[isHorizontal ? 'flex-col' : 'flex-row']"
				class="flex justify-center cursor-move p-2"
				draggable="true"
				@mousedown.prevent="startResize($event, index - 1)"
				@touchstart.prevent="startResize($event, index - 1)"
			>
				<span
					v-for="i in 3"
					:key="i"
					class="block w-2 h-2 bg-editing-dot rounded-full"
					:class="[isHorizontal ? 'mb-2' : 'ml-2']"
				/>
			</div>
			<panel
				:id="id"
				ref="panels"
				:key="id"
				:panel="panel"
				:depth="depth + 1"
				:style="{
					flexBasis: (weights[index] || 1) * 100 / childCount + '%',
				}"
			/>
		</template>
		<!-- adding in edit mode -->
		<button
			v-if="editing"
			ref="addButton"
			class="button is-add-panel p-2"
			:class="[isHorizontal ? 'ml-2' : 'mt-2']"
			@click="showAddPanel=true"
		>
			<FontAwesomeIcon
				icon="plus-square"
				size="lg"
				fixed-width
			/>
		</button>

		<overlay
			v-if="showAddPanel"
			@close="showAddPanel=false"
		>
			<template #title>
				Add Panel
			</template>
			<panel-list
				:parent-id="id"
				:parent-depth="depth"
				@close="showAddPanel=false"
			/>
		</overlay>

		<template #settings>
			<div class="field">
				<p class="label">
					Direction:
				</p>
				<button
					:class="settings.direction === 'row' ? 'is-active' : 'is-inactive'"
					class="button has-icon"
					@click="setSetting('direction', 'row')"
				>
					<FontAwesomeIcon
						icon="columns"
						size="lg"
						fixed-width
					/>
				</button>
				<button
					:class="settings.direction === 'column' ? 'is-active' : 'is-inactive'"
					class="button has-icon"
					@click="setSetting('direction', 'column')"
				>
					<FontAwesomeIcon
						:rotation="270"
						icon="columns"
						fixed-width
						size="lg"
					/>
				</button>
			</div>
		</template>
	</panel-wrapper>
</template>

<script>
import throttle from 'lodash/throttle'
import sum from 'lodash/sum'
import {mapState} from 'vuex'

import PanelList from '../panel-list'
import Overlay from '../overlay'
import hasChildPanels from '@/mixins/has-child-panels'
import panelMixin from '@/mixins/panel'

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
		isHorizontal() {
			return this.settings.direction === 'row'
		},
		directionClass({isHorizontal}) {
			return isHorizontal ? 'flex-row' : 'flex-col'
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
		startResize(event, i) {
			// Get current sizes and set as current value
			const sizeAttr = this.settings.direction === 'row' ? 'width' : 'height'
			const sizes = this.$refs.panels.map(panel => panel.$el.getBoundingClientRect()[sizeAttr])
			const total = sum(sizes)
			const count = sizes.length

			this.dragging = i
			this.draggingWeights = sizes.map(size => size / total * count)
		},
		handleResize(event) {
			if (!this._resizeThrottle) {
				this._resizeThrottle = throttle(this.doResize.bind(this), 33)
			}

			if (this.dragging !== false) {
				event.preventDefault()
				this._resizeThrottle(event)
			}
		},
		stopResizing(event) {
			if (this.dragging !== false) {
				event.preventDefault()

				this.setSetting('weights', this.draggingWeights)

				this.dragging = false
				this.draggingWeights = null
			}
		},
		doResize(event) {
			if (this.dragging !== false) {
				const i = this.dragging

				let positionOwner = event
				if (event.targetTouches && event.targetTouches.length > 0) {
					positionOwner = event.targetTouches[0]
				}

				let keys
				if (this.settings.direction === 'row') {
					keys = {
						mouse: 'pageX',
						from: 'left',
						to: 'right'
					}
				} else {
					keys = {
						mouse: 'pageY',
						from: 'top',
						to: 'bottom'
					}
				}

				const rects = this.$refs.panels
					.map(compoent => compoent.$el.getBoundingClientRect())
					.sort((a, b) => {
						return a[keys.from] - b[keys.from]
					})

				const mouse = positionOwner[keys.mouse]
				const base = rects[0][keys.from]
				const range = rects[rects.length - 1][keys.to] - base

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
