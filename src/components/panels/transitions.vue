<template>
	<panel-wrapper :content-class="['panel-transitions']">
		<template slot="name">
			Transitions
		</template>
		<div
			v-if="allTransitions"
			class="transitions"
		>
			<button
				v-for="transition in allTransitions"
				:key="transition.name"
				class="transition"
				:class="[transition.name === currentTransition ? 'is-active' : 'is-inactive']"
				@click="switchTransitions(transition.name)"
				v-text="transition.name"
			/>
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
