<template>
	<panel-wrapper :content-class="['panel-sources']">
		<template slot="name">Sources</template>
		<h3 class="scene-name">{{ currentScene ? currentScene.name : 'Unknown Scene' }}</h3>
		<div class="sources" v-if="currentScene">
			<button
				class="source"
				v-for="source in currentScene.sources"
				:key="source.name"
				:class="[source.render ? 'is-active' : 'is-inactive']"
				@click="setRender({scene: currentScene.name, source: source.name, render: !source.render})">
				{{ source.name }}
			</button>
		</div>
		<div v-else>
			Unknown scene, this should not happen :(
		</div>
	</panel-wrapper>

</template>

<script>
	import {mapActions, mapGetters} from 'vuex'

	import panelMixin from '../mixins/panel'

	export default {
		mixins: [panelMixin],
		computed: {
			...mapGetters('obs', ['currentScene'])
		},
		methods: {
			...mapActions({
				setRender: 'obs/sources/render'
			})
		}
	}
</script>
