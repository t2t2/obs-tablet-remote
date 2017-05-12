<template>
	<panel-wrapper :content-class="['is-scrollable', 'panel-scenes', 'per-row-' + perRow]">
		<template slot="name">Scenes</template>
		<button
			class="scene"
			v-for="scene in scenes"
			:key="scene.name"
			:class="{'is-active': scene.name === currentScene}"
			@click="setScene({ name: scene.name })"
		>
			{{ scene.name }}
		</button>

		<div slot="settings">
			<label>
				Scenes per row
				<div class="input-group">
					<input type="range" min="1" max="10" v-model.number="perRow" />
					<span style="width: 2.5em" v-text="perRow"></span>
				</div>
			</label>
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
				currentScene: state => state.scenes.current,
				scenes: state => state.scenes.list
			}),
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
			}
		},
		methods: {
			...mapActions('obs', {
				setScene: 'scenes/current'
			})
		}
	}
</script>
