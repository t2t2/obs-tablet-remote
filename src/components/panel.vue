<template>
	<div
		:class="{
			'color-editing-panel border p-2': editing,
			[`border-${bordersSize} panels-border`]: showBorders && !isGrid && !editing
		}"
		class="flex flex-auto flex-col overflow-hidden h-full"
	>
		<div
			v-if="editing"
			class="pb-2 flex"
		>
			<div class="flex-1 min-w-0 overflow-hidden whitespace-no-wrap text-overflow-ellipsis">
				<span :title="name">{{ name }}</span>
			</div>
			<button
				v-if="hasSettings"
				class="button is-panel"
				@click="settingsOpen = !settingsOpen"
			>
				<FontAwesomeIcon
					icon="cog"
					fixed-width
				/>
			</button>
			<button
				v-if="depth > 0"
				class="button is-panel"
				@click="remove"
			>
				<FontAwesomeIcon
					icon="trash-alt"
					fixed-width
				/>
			</button>
		</div>
		<div
			v-if="!editing || isGrid"
			class="flex-grow overflow-hidden"
			:class="contentClass"
		>
			<slot />
		</div>
		<overlay
			v-if="settingsOpen"
			:wide="wideSettings"
			@close="settingsOpen = false"
		>
			<template #title>
				Settings
			</template>
			<slot name="settings" />
		</overlay>
	</div>
</template>

<script>
import {mapState} from 'vuex'

import Overlay from '@/components/overlay'

export default {
	components: {
		Overlay
	},
	props: {
		contentClass: {
			type: null,
			default: ''
		},
		isGrid: {
			type: Boolean,
			default: () => false
		},
		wideSettings: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			settingsOpen: false
		}
	},
	computed: {
		...mapState(['settings']),
		showBorders() {
			return this.settings.showBorders
		},
		bordersSize() {
			return this.settings.bordersSize
		},
		...mapState(['editing']),
		name() {
			return this.$parent.panel.name
		},
		depth() {
			return this.$parent.depth
		},
		id() {
			return this.$parent.id
		},
		panel() {
			return this.$parent.panel
		},
		hasSettings() {
			return Boolean(this.$slots.settings)
		}
	},
	watch: {
		editing(newval) {
			if (!newval) {
				this.settingsOpen = false
			}
		}
	},
	methods: {
		remove() {
			this.$emit('remove')
			this.$store.dispatch('layout/removePanel', {id: this.id})
		}
	}
}
</script>
