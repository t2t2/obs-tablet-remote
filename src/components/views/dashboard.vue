<template>
	<div class="flex flex-col flex-1 items-stretch h-full overflow-hidden">
		<div
			class="flex flex-col items-stretch flex-1 flex-grow h-full overflow-hidden"
			:class="{'color-editing': editing}"
		>
			<tab
				v-for="tab in tabs"
				:key="tab.id"
				:tab="tab"
			/>
		</div>
		<!--
		<div class="flex-none">
			Tab Switcher
		</div>
		-->
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
