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

	computed: {
		...mapState('obs', {
			currentTransition: state => state.transitions.current,
			allTransitions: state => state.transitions.list
		})
	},

	methods: {
		async switchTransitions(name) {
			await this.setTransition({name})
		},
		...mapActions('obs', {
			setTransition: 'transitions/current'
		})
	}
}

</script>
