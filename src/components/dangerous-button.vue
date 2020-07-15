<template>
	<button
		class="button"
		@click="buttonClick"
	>
		<span v-if="isPrimed">
			Click again to confirm
			<strong v-if="cooldown">(wait 1 sec)</strong>
		</span>
		<slot v-else />
	</button>
</template>

<script>
export default {
	props: {
		vibrate: Boolean,
		time: {
			type: [Number, Boolean],
			default: 1000
		}
	},
	data() {
		return {
			cooldown: false,
			isPrimed: false
		}
	},
	methods: {
		buttonClick() {
			if (!this.time) {
				this.$emit('click')
				return
			}

			if (this.cooldown) {
				return
			}

			if (this.isPrimed) {
				this.isPrimed = false
				this.$emit('click')
				clearTimeout(this._timeout)
				return
			}

			this.isPrimed = true
			this.cooldown = true
			this._timeout = setTimeout(() => {
				this.cooldown = false
				this._timeout = setTimeout(() => {
					this.isPrimed = false
					this._timeout = null
				}, 5000)
			}, this.time)

			if (this.vibrate && window.navigator.vibrate) {
				window.navigator.vibrate(200)
			}
		}
	}
}
</script>
