<template>
	<div class="flex flex-col">
		<div
			class="h-full w-full flex"
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
