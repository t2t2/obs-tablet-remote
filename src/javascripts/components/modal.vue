<template>
	<div class="overlay" ref="overlay" v-show="show" @click="overlayClick">
		<div class="modal" :class="modalClass">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			overlayClick(e) {
				// Only call for clicks on the overlay but not contents
				if (e.target === this.$refs.overlay) {
					this.$emit('overlay-click')
				}
			}
		},
		props: {
			modalClass: null,
			show: {
				default: true
			}
		}
	}
</script>
