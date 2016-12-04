<template>
	<div class="settings-group">
		<h3>Sources</h3>

		<label>
			<input type="checkbox" v-model="settings.enabled">
			Enabled
		</label>
	</div>
</template>

<script>
	export default {
		computed: {
			enabled: {
				get() {
					return this.settings.enabled
				},
				set(value) {
					this.$emit('change', 'enabled', value)
				}
			}
		},
		props: {
			settings: Object
		}
	}
</script>
