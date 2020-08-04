<template>
	<div>
		<form @submit.prevent="submitTask">
			<div class="flex -mx-2">
				<div class="w-1/2 px-2">
					<div class="field">
						<label
							:for="`task-list-${panelId}`"
							class="label mr-3"
						>Select task type:</label>
						<select
							:id="`task-list-${panelId}`"
							v-model="selectedTaskName"
							class="select"
							required
							@change="fields = {}"
						>
							<option
								v-for="(task, index) in taskList"
								:key="`task-${index}-option`"
								:value="task.name"
							>
								{{ task.name }}
							</option>
						</select>
					</div>
				</div>
				<div class="w-1/2 px-2">
					<div
						v-for="(field, index) in relatedFields"
						:key="`field-${index}`"
						class="field"
					>
						<label
							:for="`task-list-${panelId}-field-${index}`"
							class="label mr-3"
						>{{ field.type | capitalize }} {{ field.required ? '' : '(optional)' }}:</label>
						<template
							v-if="!field.depends"
						>
							<select
								v-if="field.hasChoice"
								:id="`task-list-${panelId}-field-${index}`"
								v-model="fields[field.name]"
								class="select"
								:name="field.name"
								:required="field.required"
							>
								<option
									v-for="(option, index2) in getFieldOptions(field)"
									:key="`field-${index2}-option`"
									:value="option"
								>
									{{ option }}
								</option>
							</select>
							<input
								v-else
								:id="`task-list-${panelId}-field-${index}`"
								:name="field.name"
								class="input"
								type="text"
								:required="field.required"
							>
						</template>
						<template
							v-else
						>
							<select
								v-if="field.hasChoice"
								:id="`task-list-${panelId}-field-${index}`"
								v-model="fields[field.name]"
								class="select"
								:name="field.name"
								:required="field.required"
							>
								<option
									v-for="(option, index2) in dependedFields[field.name]"
									:key="`field-${index2}-option`"
									:value="option"
								>
									{{ option }}
								</option>
							</select>
							<input
								v-else
								:id="`task-list-${panelId}-field-${index}`"
								:name="field.name"
								class="input"
								type="text"
								:required="field.required"
							>
						</template>
					</div>
				</div>
			</div>
			<div class="w-full text-center mt-5">
				<div
					v-if="selectedTaskName"
					class="field"
				>
					<button
						class="button p-3 is-primary"
						type="submit"
					>
						Add task
					</button>
				</div>
			</div>
		</form>

	</div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
	props: {
		panelId: {
			type: [Number, String],
			required: true
		}
	},
	data() {
		return {
			selectedTaskName: null,
			fields: {},
			dependencies: []
		}
	},
	computed: {
		...mapGetters('obs', {taskList: 'queue/taskList'}),
		...mapGetters('obs', {sceneList: 'scenes/sceneList'}),
		...mapGetters('obs', {sceneNames: 'scenes/sceneNames'}),
		...mapGetters('obs', {sourceNames: 'sources/sourceNames'}),

		relatedFields() {
			const task = this.taskList.find(task => task.name === this.selectedTaskName)
			if (task) {
				return task.fields
			}

			return null
		},

		selectFieldTypeAssociating() {
			return {
				scene: 'sceneNames',
				source: 'sourceNames'
			}
		},
		fieldDependencyAssociating() {
			return {
				'>': [
					{
						pairTypes: ['source', 'scene'],
						dealer: 'getSceneItems'
					}
				]
			}
		},
		dependedFields() {
			const fieldsPool = {}

			for (const dependency of this.dependencies) {
				if (this.fields[dependency.pair[1]]) {
					const associatedDependencies = this.fieldDependencyAssociating[dependency.operator]
					for (const associatedDependency of associatedDependencies) {
						if (associatedDependency.pairTypes[0] === dependency.pairTypes[0] &&
							associatedDependency.pairTypes[1] === dependency.pairTypes[1]) {
							fieldsPool[dependency.pair[0]] = this[associatedDependency.dealer](this.fields[dependency.pair[1]])
							break
						}
					}
				} else {
					fieldsPool[dependency.pair[0]] = []
				}
			}

			return fieldsPool
		},
		selectedTask() {
			return this.taskList.find(task => task.name === this.selectedTaskName)
		}
	},
	watch: {
		// eslint-disable-next-line no-unused-vars
		selectedTaskName(value) {
			this.dependencies = []

			for (const field of this.selectedTask.fields) {
				if (field.depends) {
					if (field.depends[0] === '>') {
						const dependence = field.depends.slice(2)
						const dependenceType = this.selectedTask.fields.find(field => field.name === dependence).type
						this.dependencies.push({
							pair: [field.name, dependence],
							pairTypes: [field.type, dependenceType],
							operator: field.depends[0]
						})
					}
				}
			}
		}
	},
	methods: {
		addTask(task) {
			this.$store.dispatch('obs/queue/addTask', {
				panelId: this.panelId,
				active: true,
				...task
			})
			this.$emit('close')
		},
		submitTask() {
			const task = {...this.taskList.find(task => task.name === this.selectedTaskName)}
			for (const field of task.fields) {
				field.value = this.fields[field.name]
			}

			this.addTask(task)
		},
		getFieldOptions(field) {
			if (!field.depends) {
				const fieldType = field.type
				return this[this.selectFieldTypeAssociating[fieldType]]
			}
		},

		getSceneItems(name) {
			return this.sceneList.find(scene => scene.name === name).sources
				.map(source => source.name)
		}
	}
}
</script>
