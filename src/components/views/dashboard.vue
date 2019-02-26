<template>
	<div class="dashboard">
		<div
			class="dashboard-tabs"
			:class="{'editing-mode': editing}"
		>
			<tab
				v-for="tab in tabs"
				:key="tab.id"
				class="dashboard-tab"
				:tab="tab"
			/>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'

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
