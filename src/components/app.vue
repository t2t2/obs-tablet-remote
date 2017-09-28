<template>
	<div class="container">
		<top-bar />

		<components
			class="content"
			:is="activeView"
		/>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'

	import {parseHashBang} from '../util'

	import Dashboard from './views/dashboard'
	import Home from './views/home'
	import TopBar from './layout/top-bar'

	export default {
		components: {
			Dashboard,
			Home,
			TopBar
		},
		computed: {
			...mapGetters(['activeView'])
		},
		mounted() {
			// Check if autoconnect is ready
			const vars = parseHashBang()
			if ('auto' in vars) {
				this.doAutoconnect(vars)
			}
		},
		methods: {
			async doAutoconnect(vars) {
				const res = await this.$store.dispatch('obs/connect', {
					host: vars.host,
					port: vars.port
				})

				if (res.authRequired && vars.password) {
					await this.$store.dispatch('obs/authenticate', {
						password: vars.password
					})
				}
			}
		}
	}
</script>
