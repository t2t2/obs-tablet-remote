<template>
	<panel-wrapper
		content-class="flex flex-col"
		@remove="removeQueue({panelId: id})"
	>
		<template slot="name">
			Queue
		</template>
		<template v-if="queue">
			<div class="p-2 relative h-10 queue-top">
				<button
					ref="addButton"
					class="button p-0 float-left"
					@click="showAddTask=true"
				>
					<FontAwesomeIcon
						icon="plus-square"
						fixed-width
						size="lg"
						color="limegreen"
					/>
				</button>
				<button
					title="Run next active task"
					class="button p-0 float-right"
					@click="runNextTask({panelId: id})"
				>
					<FontAwesomeIcon
						icon="long-arrow-alt-right"
						fixed-width
						size="lg"
						color="orange"
					/>
				</button>
			</div>
			<div
				v-if="Object.keys(queue.tasks).length > 0"
				class="flex-no-wrap flex-grow flex-col button-grid has-per-row-1 overflow-y-auto"
			>
				<button
					v-for="(task, taskId) in queue.tasks"
					:key="`task-${taskId}`"
					class="flex-grow button-grid button relative p-2 max-h-1/5 min-h-8"
					style="max-height: 20%; margin-bottom: 1px"
					:class="[task.active ? 'is-active' : 'is-inactive']"
					@click="task.active = !task.active"
				>
					<div class="w-full das">
						<span
							:title="task.name"
							class="text-2xl"
						>{{ task.name }}</span>
					</div>
					<div class="overflow-y-auto w-full das">
						<p
							v-for="(field, fieldId) in task.fields"
							:key="`task-${taskId}-field-${fieldId}`"
							class="mb-1 truncate text-sm"
						>
							<span
								:title="field.name"
								class="mr-1"
							>{{ field.name }}:
							</span>
							<span :title="field.value">{{ field.value }}</span>
						</p>
					</div>
					<button
						class="button p-2 absolute top-0 right-0"
						@click.stop="removeTask({panelId: id, taskId})"
					>
						<FontAwesomeIcon
							icon="times"
							fixed-width
							color="brown"
						/>
					</button>
				</button>
			</div>
			<div
				v-else
				class="text-center mt-3"
			>
				No task yet
			</div>
		</template>
		<div v-else>
			Unknown queue, this should not happen :(
		</div>
		<overlay
			v-if="showAddTask"
			wide
			@close="showAddTask=false"
		>
			<template #title>
				Add Task
			</template>
			<task-list
				:panel-id="id"
				@close="showAddTask=false"
			/>
		</overlay>
	</panel-wrapper>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import TaskList from './queue/task-list'
import Overlay from '../overlay'

import panelMixin from '@/mixins/panel'

export default {
	components: {
		TaskList,
		Overlay
	},
	mixins: [panelMixin],
	data() {
		return {
			showAddTask: false
		}
	},
	computed: {
		...mapState('obs', {
			queues: state => state.queue.queues
		}),
		queue() {
			return this.queues[this.id]
		}
	},
	methods: {
		...mapActions('obs', {runNextTask: 'queue/runNextTask'}),
		...mapActions('obs', {runTask: 'queue/runTask'}),

		...mapActions('obs', {removeTask: 'queue/removeTask'}),
		...mapActions('obs', {removeQueue: 'queue/removeQueue'})
	}
}
</script>
