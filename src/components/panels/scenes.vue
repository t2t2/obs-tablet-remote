<template>
	<panel-wrapper :content-class="['is-scrollable', 'panel-scenes', 'per-row-' + perRow]">
		<template slot="name">
			Scenes
		</template>
		<button
			v-for="scene in scenes"
			:key="scene.name"
			class="scene"
			:class="[scene.name === currentScene ? 'is-active' : 'is-inactive']"
			@click="switchScenes(scene.name)"
		>
			{{ scene.name }}
		</button>

		<div slot="settings">
			<label>
				Scenes per row
				<div class="input-group">
					<input
						v-model.number="perRow"
						type="range"
						min="1"
						max="10"
					>
					<span
						style="width: 2.5em"
						v-text="perRow"
					/>
				</div>
			</label>
			<h3>Transition Scene</h3>
			<label>
				Transition scene
				<div class="input-group">
					<select v-model="transitionScene">
						<option :value="undefined">None</option>
						<option
							v-for="scene in scenes"
							:key="scene.name"
							:value="scene.name"
						>
							{{ scene.name }}
						</option>
					</select>
				</div>
			</label>
			<label>
				Transition time
				<div class="input-group">
					<input
						v-model.number="transitionSeconds"
						type="number"
						min="0"
						step="0.1"
					>
				</div>
			</label>
		</div>
	</panel-wrapper>
</template>

<script>
	import {mapState, mapActions} from 'vuex'

	import {timeoutPromise} from '../../util'

	import panelMixin from '../mixins/panel'

	export default {
		mixins: [panelMixin],
		computed: {
			perRow: {
				get() {
					if (this.settings.perRow) {
						return this.settings.perRow
					}
					return 4
				},
				set(value) {
					this.setSetting('perRow', value)
				}
			},
			transitionScene: {
				get() {
					return this.settings.transitionScene
				},
				set(value) {
					this.setSetting('transitionScene', value)
				}
			},
			transitionSeconds: {
				get() {
					return this.settings.transitionSeconds || 0
				},
				set(value) {
					this.setSetting('transitionSeconds', value)
				}
			},
			...mapState('obs', {
				currentScene: state => state.scenes.current,
				scenes: state => state.scenes.list
			})
		},
		methods: {
			async switchScenes(name) {
				if (this.transitionScene && this.transitionSeconds > 0) {
					this.setScene({name: this.transitionScene})
					await timeoutPromise(this.transitionSeconds * 1000)
				}
				await this.setScene({name})
			},
			...mapActions('obs', {
				setScene: 'scenes/current'
			})
		}
	}
</script>
