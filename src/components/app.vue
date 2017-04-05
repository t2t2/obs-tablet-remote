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

	import TopBar from './layout/top-bar'

	import Dashboard from './views/dashboard'
	import Home from './views/home'

	export default {
		components: {
			Dashboard,
			Home,
			TopBar
		},
		computed: {
			...mapGetters(['activeView'])
		}
	}
</script>
