<template>
	<div class="top-bar">
		<div class="item">
			OBS Remote
		</div>
		<div class="space"></div>
		<div class="item" v-if="connectionReady">
			<button @click="setEditing(!editing)"><i class="material-icons">{{ editing ? 'done' : 'mode_edit' }}</i></button>
		</div>
		<div class="item">
			<button @click="showSettings(!showingSettings)"><i class="material-icons">settings</i></button>
		</div>
		<div class="item">
			<button @click="toggleFullscreen"><i class="material-icons">fullscreen</i></button>
		</div>
		<div class="item" v-if="connectionReady">
			<button @click="disconnect"><i class="material-icons">power_settings_new</i></button>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

	import fullscreen from '../mixins/fullscreen'

	export default {
		mixins: [fullscreen],
		computed: {
			...mapState(['editing', 'showingSettings']),
			...mapGetters('obs', ['connectionReady'])
		},
		methods: {
			...mapActions({
				setEditing: 'editing'
			}),
			...mapActions('obs', [
				'disconnect'
			]),
			...mapMutations(['showSettings'])
		}
	}
</script>
