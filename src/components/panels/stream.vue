<template>
	<panel-wrapper :content-class="['button-grid', 'has-per-row-1', 'overflow-y-auto']">
		<template slot="name">
			Stream Status
		</template>
		<DangerousButton
			v-if="showStreaming"
			:class="[streaming ? 'is-active' : 'is-inactive']"
			class="relative"
			:vibrate="true"
			:time="500"
			@click="setStreaming({status: !streaming})"
		>
			<span
				:title="streamingText"
				class="w-1/5 h-1/3 max-w-2 title-zone absolute left-0 top-0"
				@click.stop
			></span>
			<p class="mb-2">
				Streaming:
			</p>
			<p>{{ streamingText }}</p>
		</DangerousButton>
		<DangerousButton
			v-if="showRecording"
			:class="[recording ? 'is-active' : 'is-inactive']"
			class="relative"
			:vibrate="true"
			:time="500"
			@click="setRecording({status: !recording})"
		>
			<span
				:title="streamingText"
				class="w-1/5 h-1/3 max-w-2 title-zone absolute left-0 top-0"
				@click.stop
			></span>
			<p class="mb-2">
				Recording:
			</p>
			<p>{{ recordingText }}</p>
		</DangerousButton>
		<DangerousButton
			v-if="showStudioMode"
			:class="[studioMode ? 'is-active' : 'is-inactive']"
			class="relative"
			:vibrate="true"
			:time="false"
			@click="setStudioMode({status: !studioMode})"
		>
			<span
				:title="studioModeText"
				class="w-1/5 h-1/3 max-w-2 title-zone absolute left-0 top-0"
				@click.stop
			></span>
			<p class="mb-2">
				Studio Mode:
			</p>
			<p>{{ studioModeText }}</p>
		</DangerousButton>
		<template slot="settings">
			<div class="field">
				<label
					:for="`settings-${id}-streaming-status`"
					class="label inline"
				>
					Streaming
				</label>
				<input
					:id="`settings-${id}-streaming-status`"
					v-model="showStreaming"
					class="inline ml-2"
					type="checkbox"
				>
			</div>
			<div class="field">
				<label
					:for="`settings-${id}-recording-status`"
					class="label inline"
				>
					Recording
				</label>
				<input
					:id="`settings-${id}-recording-status`"
					v-model="showRecording"
					class="inline ml-2"
					type="checkbox"
				>
			</div>
			<div class="field">
				<label
					:for="`settings-${id}-studio-mode-status`"
					class="label inline"
				>
					Studio mode
				</label>
				<input
					:id="`settings-${id}-studio-mode-status`"
					v-model="showStudioMode"
					class="inline ml-2"
					type="checkbox"
				>
			</div>
		</template>
	</panel-wrapper>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'

import DangerousButton from '../dangerous-button'
import panelMixin from '@/mixins/panel'

export default {
	components: {
		DangerousButton
	},
	mixins: [panelMixin],
	computed: {
		...mapState('obs', {
			recording: state => state.stream.recording,
			recTimecode: state => state.stream.recTimecode,
			streaming: state => state.stream.streaming,
			streamTimecode: state => state.stream.streamTimecode,
			studioMode: state => state.stream.studioMode
		}),
		...mapGetters('obs',
			['recordingText', 'streamingText', 'studioModeText']),

		showStreaming: {
			get() {
				return this.settings.showStreaming
			},
			set(value) {
				this.setSetting('showStreaming', value)
			}
		},
		showRecording: {
			get() {
				return this.settings.showRecording
			},
			set(value) {
				this.setSetting('showRecording', value)
			}
		},
		showStudioMode: {
			get() {
				return this.settings.showStudioMode
			},
			set(value) {
				this.setSetting('showStudioMode', value)
			}
		}
	},
	methods: {
		...mapActions('obs', {
			setRecording: 'stream/recording',
			setStreaming: 'stream/streaming',
			setStudioMode: 'stream/studioMode'
		})
	}
}
</script>
