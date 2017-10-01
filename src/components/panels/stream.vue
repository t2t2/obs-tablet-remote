<template>
	<panel-wrapper :content-class="['panel-stream', 'is-scrollable']">
		<template slot="name">Stream Status</template>
		<DangerousButton
			:class="[streaming ? 'is-active' : 'is-inactive']"
			:vibrate="true"
			@click="setStreaming({status: !streaming})"
		>
			Streaming: {{ streamingText }}
		</DangerousButton>
		<DangerousButton
			:class="[recording ? 'is-active' : 'is-inactive']"
			:vibrate="true"
			@click="setRecording({status: !recording})"
		>
			Recording: {{ recordingText }}
		</DangerousButton>
	</panel-wrapper>
</template>

<script>
	import {mapActions, mapGetters, mapState} from 'vuex'

	import panelMixin from '../mixins/panel'
	import DangerousButton from '../dangerous-button'

	export default {
		mixins: [panelMixin],
		components: {
			DangerousButton
		},
		computed: {
			...mapState('obs', {
				recording: state => state.stream.recording,
				recTimecode: state => state.stream.recTimecode,
				streaming: state => state.stream.streaming,
				streamTimecode: state => state.stream.streamTimecode
			}),
			...mapGetters('obs', ['recordingText', 'streamingText'])
		},
		methods: {
			...mapActions('obs', {
				setRecording: 'stream/recording',
				setStreaming: 'stream/streaming'
			})
		}
	}
</script>
