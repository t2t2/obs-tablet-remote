<template>
	<button
		class="button"
		@click="buttonClick"
	>
		<template v-if="isPrimed">
			<p class="mb-2">
				Click again to confirm
			</p>
			<p
				v-if="cooldown"
				class="strong"
			>
				(wait {{ timeLeft/1000 }} sec)
			</p>
		</template>
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
			isPrimed: false,
			timeLeft: 0
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
			this.timeLeft = this.time
			this._interval = setInterval(() => {
				this.timeLeft -= 100
			}, 100)
			this._timeout = setTimeout(() => {
				this.cooldown = false
				clearInterval(this._interval)
				this.timeLeft = 0

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
