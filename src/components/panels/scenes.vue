<template>
	<panel-wrapper :content-class="['is-scrollable', 'panel-scenes', 'per-row-4']">
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
	</panel-wrapper>
</template>

<script>
	import { mapState, mapActions } from 'vuex'

	import panelMixin from '../mixins/panel'
	import Panel from '../panel'

	export default {
		mixins: [panelMixin],
		computed: {
			// vuex#708
			...mapState({
				currentScene: state => state.obs.scenes.current,
				scenes: state => state.obs.scenes.list
			})
		},
		methods: {
			...mapActions('obs', {
				setScene: 'scenes/current'
			})
		}
	}
</script>
