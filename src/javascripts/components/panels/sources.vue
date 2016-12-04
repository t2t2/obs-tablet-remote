<template>
	<div class="panel sources-panel">
		<div class="scene" v-if="currentScene">
			<h3 class="scene-name" v-text="currentScene.name"></h3>

			<div class="sources">
				<button class="source"
				        v-for="source in currentScene.sources" :key="source.name"
				        :class="{ active: source.render }" v-text="source.name"
				        @click="toggleSource(currentScene.name, source.name, !source.render)">
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import OBSUserMixin from '../../mixins/obs-user'

	export default {
		computed: {
			currentScene() {
				return this.obs.scenes.find(scene => {
					return scene.name === this.obs.currentScene
				})
			}
		},

		methods: {
			isCurrentScene(scene) {
				return scene.name === this.obs.currentScene
			},

			async toggleSource(scene, source, render) {
				await this.$obs.setSourceRender(scene, source, render)
				// No automatic update as of obs-websocket 0.3.1
				this.$emit('force-refresh')
			}
		},

		mixins: [OBSUserMixin],

		props: {
			obs: Object,
			settings: Object
		}
	}
</script>
