<template>
	<panel-wrapper :content-class="['button-grid', 'has-per-row-1', 'overflow-y-auto']">
		<template slot="name">
			Mixer
		</template>

		<template
			v-if="audioDevices"
			class="audio-devices"
		>
			<button
				v-for="audioDevice in audioDevices"
				:id="audioDevice.name.replace(/\W/g,'-')"
				:key="audioDevice.name"
				:runme="getMuteStatus(audioDevice.name)"
				class="button"
				@click="toggleMuteForAudioDevice(audioDevice.name)"
				v-text="audioDevice.name"
			/>
		</template>
		<template v-else>
			Audio Device list is empty? ¯\_(ツ)_/¯
		</template>
	</panel-wrapper>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import panelMixin from '@/mixins/panel'

export default {

	mixins: [panelMixin],

	computed: {
		...mapState('obs', {
			audioDevices: state => state.mixer.list
		})
	},

	methods: {
		getMuteStatus(name) {
			this.muteStatus({name})
		},
		async toggleMuteForAudioDevice(name) {
			await this.toggleMute({name})
		},
		...mapActions('obs', {
			toggleMute: 'mixer/toggle-mute',
			muteStatus: 'mixer/mute-status'
		})
	}
}

</script>
