<template>
	<panel-wrapper :content-class="['panel-mixer']">
		<template slot="name">Mixer</template>
		<div class="audio-devices" v-if="audioDevices">
			<div
				:id="audioDevice.name.replace(/\W/g,'-')"
				v-for="audioDevice in audioDevices"
				class="audio-device"
				:runme="getMuteStatus(audioDevice.name)"
			>
				<div style="text-align: center">
				<span v-text="audioDevice.name"></span>
				</div>
				<div>
				<input  type="range" min="0" max="1" step="0.0001" class="slider" style="width: 100%"
						:id="'slider_' + audioDevice.name.replace(/\W/g,'-')"
						:value="getVolume(audioDevice.name)"
						v-on:change="setAudioVolume(audioDevice.name)"
				>
				</div>
				<div>
				<button
					:id="'button_' + audioDevice.name.replace(/\W/g,'-')"
					@click="toggleMuteForAudioDevice(audioDevice.name)"
					:key="audioDevice.name"
					style="width: 100%"
				></button>
				</div>

			</div>

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
		getVolume(name) {
			this.volume({name})
		},
		setAudioVolume(name) {
			this.setVolume({name})
		},
		...mapActions('obs', {
			toggleMute: 'mixer/toggle-mute',
			muteStatus: 'mixer/mute-status',
			volume: 'mixer/get-volume',
			setVolume: 'mixer/set-volume'
		})
	}
}

</script>
