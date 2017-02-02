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
				if (this.settings.switcher.transitionScene !== "") {
					this.$obs.setCurrentScene(this.settings.switcher.transitionScene);
					var scope = this;
					setTimeout(function() {
						scope.$obs.setCurrentScene(scene.name);
					}, this.settings.switcher.transitionSeconds * 1000);
				} else {
					this.$obs.setCurrentScene(scene.name)
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
