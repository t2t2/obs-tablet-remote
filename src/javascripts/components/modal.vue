<template>
	<div class="overlay" v-el:overlay v-show="show" @click="overlayClick">
		<div class="modal" :class="modalClass">
			<slot></slot>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		methods: {
			overlayClick: function (e) {
				// Only call for clicks on the overlay but not contents
				if (e.target == this.$els.overlay) {
					this.$emit('overlay-click')
				}
			},
		},

		props: {
			modalClass: null,
			show:       {
				default: true,
			},
		},
	}
</script>