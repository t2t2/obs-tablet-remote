<template>
	<overlay
		wide
		@close="showSettings(false)"
	>
		<template #title>
			Global Settings
		</template>

		<div class="flex -mx-2 mb-4">
			<div class="w-1/2 px-2">
				<div class="field">
					<label
						:for="`settings-theme`"
						class="label"
					>Theme</label>
					<select
						:id="`settings-theme`"
						v-model="theme"
						class="select"
					>
						<option value="default">
							Default
						</option>
						<option value="dark-blue">
							Dark & Blue
						</option>
					</select>
				</div>
			</div>
			<div class="w-1/2 px-2">
				<h3 class="text-xl mb-2">
					Danger Zone
				</h3>
				<button
					class="button is-primary"
					@click="askForReset"
				>
					Reset Layout
				</button>
			</div>
		</div>
		<div class="flex -mx-2">
			<div class="w-1/3 px-2">
				<div class="field">
					<div class="flex">
						<label
							:for="`settings-show-grid`"
							class="label"
						>Show borders</label>
						<input
							:id="`settings-show-grid`"
							v-model="showBorders"
							class="inline ml-2 mt-1"
							type="checkbox"
						>
					</div>
				</div>
			</div>
			<div class="w-2/3 px-2">
				<div class="field">
					<label
						:for="`settings-borders-size`"
						class="label"
					>Borders size</label>
					<div class="flex">
						<input
							:id="`settings-borders-size`"
							v-model.number="bordersSize"
							type="range"
							class="flex-grow"
							min="1"
							max="4"
						>
						<span
							class="w-10 p-2"
							v-text="bordersSize"
						/>
					</div>
				</div>
			</div>
		</div>
	</overlay>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

import Overlay from '@/components/overlay'

export default {
	components: {
		Overlay
	},
	computed: {
		...mapState(['settings']),
		theme: {
			get({settings}) {
				return settings.theme
			},
			set(value) {
				this.setSetting({key: 'theme', value})
			}
		},
		showBorders: {
			get({settings}) {
				return settings.showBorders
			},
			set(value) {
				this.setSetting({key: 'showBorders', value})
			}
		},
		bordersSize: {
			get({settings}) {
				return settings.bordersSize
			},
			set(value) {
				this.setSetting({key: 'bordersSize', value})
			}
		}
	},
	methods: {
		askForReset() {
			// eslint-disable-next-line no-alert
			if (confirm('Are you sure you want to reset the layout?')) {
				this.resetLayout()
			}
		},
		...mapMutations(['showSettings']),
		...mapMutations('settings', {
			setSetting: 'set'
		}),
		...mapMutations('layout', ['resetLayout'])
	}
}
</script>
