<template>
	<div class="settings-group">
		<h3>Switcher</h3>
		<label>
			Scenes per row
			<div class="input-group">
				<input type="range" min="1" max="10" v-model.number="perRow" />
				<span style="width: 2.5em" v-text="perRow"></span>
			</div>
		</label>
		<h3>Transition Scene</h3>
		<label>
			Transition scene
			<div class="input-group">
				<select v-model="transitionScene">
					<option value="">None</option>
					<option v-for="scene in obs.scenes" v-bind:value="scene.name">{{ scene.name }}</option>
				</select>
			</div>
		</label>
		<label>
			Transition time
			<div class="input-group">
				<input v-model.number="transitionSeconds" type="number" step="0.1">
			</div>
		</label>
	</div>
</template>

<script>
	import OBSUserMixin from '../../mixins/obs-user'

	export default {
		computed: {
			perRow: {
				get() {
					return this.settings.perRow
				},
				set(value) {
					this.$emit('change', 'perRow', value)
				}
			},
			transitionScene: {
				get() {
					return this.settings.transitionScene
				},
				set(value) {
					this.$emit('change', 'transitionScene', value)
				}
			},
			transitionSeconds: {
				get() {
					return this.settings.transitionSeconds
				},
				set(value) {
					this.$emit('change', 'transitionSeconds', value)
				}
			}
		},

		mixins: [OBSUserMixin],

		props: {
			obs: Object,
			settings: Object
		}
	}
</script>
