<template>
	<panel-wrapper content-class="flex flex-col">
		<template slot="name">
			Queue
		</template>
		<div class="p-2 relative">
			<h3 class="text-center font-bold">
				Unknown Scene
			</h3>
			<button
				title="Run next task"
				class="button absolute top-0 right-0"
				@click="runNextTask"
			>
				<FontAwesomeIcon
					icon="long-arrow-alt-right"
					fixed-width
				/>
			</button>
		</div>
		<div
			v-if="queue"
			class="flex-grow button-grid has-per-row-1 overflow-y-auto"
		>
			<div v-if="queue.length > 0">
				<button
					v-for="task in queue"
					:key="task.id"
					class="button"
					:class="[task.active ? 'is-active' : 'is-inactive']"
					@click="task.active = !task.active"
				>
					{{ task.description }}
				</button>
			</div>
			<div v-else>
				No tasks yet
			</div>
		</div>
		<div v-else>
			Unknown task list, this should not happen :(
		</div>
	</panel-wrapper>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {mapActions, mapGetters} from 'vuex'

import panelMixin from '@/mixins/panel'

export default {
	mixins: [panelMixin],
	data() {
		return {
			queue: Object
		}
	},
	computed: {

	},
	methods: {
		runNextTask() {

		}

	}
}
</script>
