<template>
	<div class="flex flex-col">
		<h5 class="px-2">
			{{ source.name }}
		</h5>
		<div class="flex">
			<input
				v-model="volume"
				class="flex-1 w-full mx-2 slider"
				type="range"
				min="0"
				max="1"
				step="0.01"
			>
			<button
				:class="[source.muted ? 'is-off' : 'is-inactive']"
				class="button"
				@click="toggleMute({source: source.name, mute: !source.muted})"
			>
				<FontAwesomeIcon
					:icon="source.muted ? 'volume-mute' : 'volume-up'"
					fixed-width
				/>
			</button>
		</div>
	</div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
	props: {
		source: {
			type: Object,
			required: true
		}
	},
	computed: {
		volume: {
			get({source: {volume}}) {
				return Math.sqrt(volume)
			},
			set(volume) {
				this.setVolume({
					source: this.source.name,
					volume: volume ** 2
				})
			}
		}
	},
	methods: {
		...mapActions('obs', {
			setVolume: 'sources/volume',
			toggleMute: 'sources/mute'
		})
	}

}
</script>
