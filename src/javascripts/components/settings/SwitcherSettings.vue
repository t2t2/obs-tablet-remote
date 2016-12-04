<template>
	<div class="settings-group">
		<h3>Switcher</h3>
		<label>
			Scenes per row
			<div class="input-group">
				<input type="range" min="1" max="10" v-model.number="perRow" />
				<span style="width: 2.5em" v-text="perRow"></span>
			</div>
		</label>
	</div>
</template>

<script>
	export default {
		computed: {
			perRow: {
				get() {
					return this.settings.perRow
				},
				set(value) {
					this.$emit('change', 'perRow', value)
				}
			}
		},
		props: {
			settings: Object
		}
	}
</script>
