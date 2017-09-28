<template>
	<div
		class="overlay"
		v-show="show"
		@click.self="$emit('overlay-click')"
	>
		<div class="modal" :class="modalClass">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			modalClass: null,
			show: {
				default: true
			}
		}
	}
</script>
