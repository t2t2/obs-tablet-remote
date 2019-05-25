<template>
	<panel-wrapper content-class="flex flex-col">
		<template slot="name">
			Sources
		</template>

		<h3 class="p-2 text-center font-bold">
			{{ currentScene ? currentScene.name : 'Unknown Scene' }}
		</h3>
		<div
			v-if="currentScene"
			class="flex-grow button-grid has-per-row-1 overflow-y-auto"
		>
			<button
				v-for="source in currentScene.sources"
				:key="source.name"
				class="button"
				:class="[source.render ? 'is-active' : 'is-inactive']"
				@click="setRender({scene: currentScene.name, source: source.name, render: !source.render})"
			>
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

import panelMixin from '@/mixins/panel'

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
