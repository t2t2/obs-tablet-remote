<template>
	<div class="dashboard">
		<div class="dashboard-tabs" :class="{'editing-mode': editing}">
			<tab
				class="dashboard-tab"
				v-for="tab in tabs"
				:key="tab.id"
				:tab="tab"
			/>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	import Tab from '../tab'

	export default {
		components: {
			Tab
		},
		computed: {
			...mapState(['editing']),
			...mapState('layout', ['tabs'])
		}
	}
</script>
