<template>
	<overlay
		wide
		@close="showSettings(false)"
	>
		<template v-slot:title>
			Global Settings
		</template>
		<div class="settings-container">
			<div class="settings-group">
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
	</overlay>
</template>

<script>
import {mapMutations} from 'vuex'

import Overlay from '@/components/overlay'

export default {
	components: {
		Overlay
	},
	methods: {
		askForReset() {
			// eslint-disable-next-line no-alert
			if (confirm('Are you sure you want to reset the layout?')) {
				this.resetLayout()
			}
		},
		...mapMutations(['showSettings']),
		...mapMutations('layout', ['resetLayout'])
	}
}
</script>
