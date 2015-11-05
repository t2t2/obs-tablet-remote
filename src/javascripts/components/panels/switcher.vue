<template>
	<div class="panel switcher" :class="classes">
		<button v-for="scene in obs.scenes" class="scene" :class="{active: scene.name == obs.currentScene}"
		        @mousedown.stop.prevent="switchToScene(scene)"
		        @tap.stop.prevent="switchToScene(scene)">
			{{scene.name}}
		</button>
	</div>
</template>

<script type="text/ecmascript-6">
	import OBSUserMixin from '../../mixins/obs-user.js'

	export default {
		computed: {
			classes: function () {
				return 'per-row-' + this.settings.switcher.perRow
			},
		},

		methods: {
			switchToScene: function (scene) {
				this.$obs.setCurrentScene(scene.name)
			},
		},

		mixins: [OBSUserMixin],

		props: {
			obs:      Object,
			settings: Object,
		},
	}
</script>