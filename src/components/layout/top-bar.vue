<template>
	<div class="top-bar">
		<div class="item">
			OBS Remote
		</div>
		<div class="space"></div>
		<div class="item" v-if="connectionReady">
			<button @click="toggleEditing" :class="{'is-highlighted': !hasEdited}"><i class="material-icons">{{ editing ? 'done' : 'mode_edit' }}</i></button>
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
			...mapState('settings', ['hasEdited']),
			...mapGetters('obs', ['connectionReady'])
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
