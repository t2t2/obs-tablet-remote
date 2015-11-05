<template>
	<div id="settings">
		<h2>Settings</h2>

		<div class="settings-container">
			<div class="settings-group">
				<h3>Switcher</h3>
				<label>
					Scenes per row
					<div class="input-group">
						<input type="range" min="1" max="10" v-model="settings.switcher.perRow"/>
						<span style="width: 2.5em" v-text="settings.switcher.perRow"></span>
					</div>
				</label>
			</div>
			<div class="settings-group">
				<h3>Sources</h3>

				<label>
					<input type="checkbox" v-model="settings.sources.enabled">
					Enabled
				</label>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			settings: {
				type:   Object,
				twoWay: true,
			},
		},
	}
</script>