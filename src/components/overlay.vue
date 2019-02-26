<template>
	<div
		v-show="show"
		class="overlay"
		@click.self="$emit('overlay-click')"
	>
		<div
			class="modal"
			:class="modalClass"
		>
			<slot />
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			modalClass: {
				type: null,
				default: ''
			},
			show: {
				type: Boolean,
				default: true
			}
		}
	}
</script>
