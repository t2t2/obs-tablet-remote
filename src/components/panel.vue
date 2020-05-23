<template>
	<div
		:class="{'color-editing-panel border p-2': editing}"
		class="flex flex-auto flex-col overflow-hidden h-full"
	>
		<div
			v-if="editing"
			class="pb-2 flex"
		>
			<div class="flex-1 min-w-0 overflow-hidden whitespace-no-wrap text-overflow-ellipsis">
				<slot name="name" />
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
		}
	},
	data() {
		return {
			settingsOpen: false
		}
	},
	computed: {
		...mapState(['editing']),
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
			this.$store.dispatch('layout/removePanel', {id: this.id})
		}
	}
}
</script>
