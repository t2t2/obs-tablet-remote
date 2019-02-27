<template>
	<div class="top-bar">
		<div class="item">
			OBS Remote
		</div>
		<div class="space" />
		<div
			v-if="connectionReady"
			key="editing-button"
			class="item"
		>
			<button
				:class="{'is-highlighted': !hasEdited}"
				@click="toggleEditing"
			>
				<FontAwesomeIcon
					:icon="editing ? 'check' : 'pencil-alt'"
				/>
			</button>
		</div>
		<div class="item">
			<button @click="showSettings(!showingSettings)">
				<FontAwesomeIcon
					icon="cog"
				/>
			</button>
		</div>
		<div class="item">
			<button @click="toggleFullscreen">
				<FontAwesomeIcon
					icon="expand"
				/>
			</button>
		</div>
		<div
			v-if="connectionReady"
			key="disconnect-button"
			class="item"
		>
			<button @click="disconnect">
				<FontAwesomeIcon
					icon="power-off"
				/>
			</button>
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
