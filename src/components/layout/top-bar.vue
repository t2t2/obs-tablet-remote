<template>
	<div class="flex-none color-ui h-8 md:h-12 px-2 flex items-center justify-between leading-none">
		<div class="mx-2">
			OBS Remote
		</div>
		<div class="self-stretch flex-grow" />
		<div
			v-if="connectionReady"
			class="md:mx-2"
			:class="['text-gray-100', {'text-opacity-25': !streaming}]"
		>
			<FontAwesomeIcon
				icon="cloud-upload-alt"
			/><span
				class="hidden md:inline"
			>&nbsp;Streaming</span>
		</div>
		<div
			v-if="connectionReady"
			class="md:mx-8"
			:class="['text-gray-100', {'text-opacity-25': !recording}]"
		>
			<FontAwesomeIcon
				icon="circle"
			/><span
				class="hidden md:inline"
			>&nbsp;Recording</span>
		</div>
		<button
			v-if="connectionReady"
			key="editing-button"
			class="button is-primary ml-2 md:h-12"
			:class="{'is-highlighted': !hasEdited}"
			@click="toggleEditing"
		>
			<FontAwesomeIcon
				:icon="editing ? 'check' : 'pencil-alt'"
			/>
		</button>
		<button
			class="button is-primary"
			@click="showSettings(!showingSettings)"
		>
			<FontAwesomeIcon
				icon="cog"
			/>
		</button>
		<button
			class="button is-primary"
			@click="toggleFullscreen"
		>
			<FontAwesomeIcon
				icon="expand"
			/>
		</button>
		<button
			v-if="connectionReady"
			key="disconnect-button"
			class="button is-primary"
			@click="disconnect"
		>
			<FontAwesomeIcon
				icon="power-off"
			/>
		</button>
	</div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

import fullscreen from '@/mixins/fullscreen'

export default {
	mixins: [fullscreen],
	computed: {
		...mapState(['editing', 'showingSettings']),
		...mapState('settings', ['hasEdited']),
		...mapGetters('obs', ['connectionReady']),
		streaming() {
			return this.$store.state.obs.stream.streaming
		},
		recording() {
			return this.$store.state.obs.stream.recording
		}
	},
	methods: {
		toggleEditing() {
			if (!this.hasEdited && !this.editing) {
				this.setSetting({
					key: 'hasEdited',
					value: true
				})
			}

			this.setEditing(!this.editing)
		},
		...mapActions({
			setEditing: 'editing'
		}),
		...mapActions('obs', [
			'disconnect'
		]),
		...mapMutations(['showSettings']),
		...mapMutations('settings', {
			setSetting: 'set'
		})
	}
}
</script>

<style lang="postcss" scoped>
	.button {
		@apply ml-2 h-full py-2;
	}
	@screen md {
		.button {
			@apply text-2xl;
		}
	}
</style>
