<template>
	<panel-wrapper :content-class="['panel-mixer']">
		<template slot="name">Mixer</template>
		<div class="audio-devices" v-if="audioDevices">
			<button
				:id="audioDevice.name.replace(/\W/g,'-')"
				:runme="getMuteStatus(audioDevice.name)"
				class="audio-device"
				v-for="audioDevice in audioDevices"
				:key="audioDevice.name"
				@click="toggleMuteForAudioDevice(audioDevice.name)"
				v-text="audioDevice.name"></button>
		</div>
		<div v-else>
			Audio Device list is empty? ¯\_(ツ)_/¯
		</div>
	</panel-wrapper>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import panelMixin from '../mixins/panel'

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
