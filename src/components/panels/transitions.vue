<template>
	<panel-wrapper :content-class="['panel-transitions']">
		<template slot="name">Transitions</template>
		<div class="transitions" v-if="allTransitions">
			<button
				class="transition"
				v-for="transition in allTransitions"
				:key="transition.name"
				:class="[transition.name === currentTransition ? 'is-active' : 'is-inactive']"
				@click="switchTransitions(transition.name)"
				v-text="transition.name"></button>
			<hr></hr>
			<button
				class="duration"
				v-for="duration in staticDurations"
				:class="[duration.duration === currentDuration ? 'is-active' : 'is-inactive']"
				:key="duration.duration"
				@click="changeDuration(duration.duration)">{{ duration.duration }}ms</button>
		</div>
		<div v-else>
			Transition list is empty! Should minimally have 'Cut' and 'Fade' ... Something is wrong :(
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
			currentTransition: state => state.transitions.current,
			currentDuration: state => state.transitions.duration,
			allTransitions: state => state.transitions.list
		})
	},

	methods: {
		async switchTransitions(name) {
			await this.setTransition({name})
		},
		async changeDuration(ms) {
			await this.setDuration({ms})
		},
		...mapActions('obs', {
			setTransition: 'transitions/current',
			setDuration: 'transitions/duration'
		})
	}
}

</script>
