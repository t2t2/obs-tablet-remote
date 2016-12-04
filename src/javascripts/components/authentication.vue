<template>
	<div class="authentication">
		<div class="alert error" v-if="authenticationError" v-text="'Error: ' + authenticationError"></div>
		<form @submit.prevent="authOBS">
			<h2>Password required</h2>
			<label>
				Password
				<input type="password" v-model="password"/>
			</label>
			<button :disabled="authenticating" v-text="authenticating ? 'Checking...' : 'Log In'"></button>
		</form>
	</div>
</template>

<script>
	export default {
		computed: {
			password: {
				get() {
					if (this.userValue.password !== null) {
						return this.userValue.password
					}
					return this.obs.password
				},
				set(value) {
					this.userValue.password = value
				}
			}
		},
		data() {
			return {
				authenticationError: null,
				userValue: {
					password: null
				}
			}
		},
		methods: {
			authOBS() {
				const callback = async promise => {
					try {
						await promise
					} catch (err) {
						this.authenticationError = err.message
					}
				}
				this.$emit('auth-obs', {
					callback,
					password: this.password
				})
			}
		},
		props: {
			authenticating: Boolean,
			obs: Object
		}
	}
</script>
