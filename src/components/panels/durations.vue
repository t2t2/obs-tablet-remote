<template>
	<panel-wrapper :content-class="['button-grid', 'has-per-row-1', 'overflow-y-auto']">
		<template slot="name">
			Durations
		</template>

		<template
			v-if="allDurations"
			class="durations"
		>
			<button
				v-for="duration in allDurations"
				:key="duration"
				class="button"
				:class="[duration === currentDuration ? 'is-active' : 'is-inactive']"
				@click="changeDuration(duration)"
			>
				{{ duration }}ms
			</button>
		</template>
	</panel-wrapper>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import panelMixin from '@/mixins/panel'

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
