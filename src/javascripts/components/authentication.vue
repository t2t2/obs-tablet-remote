<template>
	<div class="authentication">
		<div class="authentication-error" v-if="authenticationError" v-text="'Error: ' + authenticationError"></div>
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

<script type="text/ecmascript-6">
	export default {
		data: function () {
			return {
				authenticationError: null,
			}
		},

		methods: {
			authOBS: function () {
				return this.$root.authOBS().catch((error) => {
					this.authenticationError = error
					throw error
				})
			},
		},

		props: {
			authenticating: Boolean,
			password:       {
				twoWay: true,
			},
		},
	}
</script>