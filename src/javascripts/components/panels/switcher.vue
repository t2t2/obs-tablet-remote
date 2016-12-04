<template>
	<div class="panel switcher" :class="classes">
		<button v-for="scene in obs.scenes" class="scene" :class="{active: scene.name == obs.currentScene}"
		        @click.stop.prevent="switchToScene(scene)">
			{{scene.name}}
		</button>
	</div>
</template>

<script>
	import OBSUserMixin from '../../mixins/obs-user'

	export default {
		computed: {
			classes() {
				return 'per-row-' + this.settings.switcher.perRow
			}
		},

		methods: {
			switchToScene(scene) {
				this.$obs.setCurrentScene(scene.name)
			}
		},

		mixins: [OBSUserMixin],

		props: {
			obs: Object,
			settings: Object
		}
	}
</script>
