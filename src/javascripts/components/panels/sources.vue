<template>
	<div class="panel sources-panel">
		<div class="scene" v-for="scene in obs.scenes | filterBy isCurrentScene" track-by="name">
			<h3 class="scene-name" v-text="scene.name">title</h3>

			<div class="sources">
				<button class="source"
				        v-for="source in scene.sources" track-by="name"
				        :class="{ active: source.render }" v-text="source.name"
				        @click="toggleSource(scene.name, source.name, !source.render)">
				</button>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import OBSUserMixin from '../../mixins/obs-user.js'

	import findFirst from 'lodash/collection/find.js'

	export default {
		data: function () {
			return {}
		},

		methods: {
			isCurrentScene: function (scene) {
				return scene.name == this.obs.currentScene
			},

			toggleSource: function (scene, source, render) {
				this.$obs.setSourceRender(scene, source, render)
			},
		},

		mixins: [OBSUserMixin],

		props: {
			obs:      Object,
			settings: Object,
		},

	}
</script>