<template>
	<div id="settings">
		<h2>Settings</h2>

		<div class="settings-container">
			<switcher-settings :obs="obs" :settings="settings.switcher" @change="setValue(`switcher.${arguments[0]}`, arguments[1])"></switcher-settings>
			<sources-settings :settings="settings.sources" @change="setValue(`sources.${arguments[0]}`, arguments[1])"></sources-settings>
		</div>
	</div>
</template>

<script>
	import SourcesSettings from './settings/SourcesSettings'
	import SwitcherSettings from './settings/SwitcherSettings'

	export default {
		components: {
			SourcesSettings,
			SwitcherSettings
		},
		methods: {
			setValue(key, value) {
				this.$emit('update-setting', key, value)
			}
		},
		props: {
			obs: Object,
			settings: Object
		}
	}
</script>
