<template>
	<panel-wrapper :content-class="['panel-durations']">
		<template slot="name">Durations</template>
		<h3 class="current-duration">{{ currentDuration }}ms</h3>
		<div class="durations" v-if="allDurations">
			<button
				class="duration"
				v-for="duration in allDurations"
				:class="[duration === currentDuration ? 'is-active' : 'is-inactive']"
				:key="duration"
				@click="changeDuration(duration)">{{ duration }}ms</button>
		</div>
	</panel-wrapper>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import panelMixin from '../mixins/panel'

export default {
	mixins: [panelMixin],

	data() {
		const data = {
			staticDurations: [{duration: 100}, {duration: 300}, {duration: 600}, {duration: 1000}, {duration: 1500}]
			// Static durations logrithmic in nature
		}
		return data
	},

	computed: {
		...mapState('obs', {
			currentDuration: state => state.durations.current,
			allDurations: state => state.durations.list
		})
	},

	methods: {
		async changeDuration(ms) {
			await this.setDuration({ms})
		},
		...mapActions('obs', {
			setDuration: 'durations/current'
		})
	}
}

</script>
