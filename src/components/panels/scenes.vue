<template>
	<panel-wrapper :content-class="['button-grid', 'has-per-row-' + perRow, 'overflow-y-auto', 'flex-wrap', 'text-3xl']">
		<template #name>
			Scenes
		</template>

		<button
			v-for="scene in scenes"
			:key="scene.name"
			class="button"
			:class="[scene.name === currentScene ? 'is-active' :
				scene.name === previewScene ? 'is-preview-scene' :
				'is-inactive']"
			@click="switchScenes(scene.name)"
		>
			{{ scene.name }}
		</button>

		<template #settings>
			<div class="field">
				<label
					:for="`settings-${id}-per-row`"
					class="label"
				>Scenes per row</label>
				<div class="flex">
					<input
						:id="`settings-${id}-per-row`"
						v-model.number="perRow"
						type="range"
						class="flex-grow"
						min="1"
						max="12"
					>
					<span
						class="w-10 p-2"
						v-text="perRow"
					/>
				</div>
			</div>
			<div class="field">
				<label
					:for="`settings-${id}-only-current`"
					class="label inline"
				>
					Only current
				</label>
				<input
					:id="`settings-${id}-only-current`"
					v-model="onlyCurrent"
					class="inline ml-2"
					type="checkbox"
				>
			</div>

			<!--			<h3 class="text-xl mb-2">-->
			<!--				Transition Scene-->
			<!--			</h3>-->
			<!--			<div class="field">-->
			<!--				<label-->
			<!--					:for="`settings-${id}-transition-scene`"-->
			<!--					class="label"-->
			<!--				>Transition Scene</label>-->
			<!--				<select-->
			<!--					:id="`settings-${id}-transition-scene`"-->
			<!--					v-model="transitionScene"-->
			<!--					class="select"-->
			<!--				>-->
			<!--					<option :value="undefined">-->
			<!--						None-->
			<!--					</option>-->
			<!--					<option-->
			<!--						v-for="scene in scenes"-->
			<!--						:key="scene.name"-->
			<!--						:value="scene.name"-->
			<!--					>-->
			<!--						{{ scene.name }}-->
			<!--					</option>-->
			<!--				</select>-->
			<!--			</div>-->
			<!--			<div class="field">-->
			<!--				<label-->
			<!--					:for="`settings-${id}-transition-time`"-->
			<!--					class="label"-->
			<!--				>Transition Time</label>-->
			<!--				<input-->
			<!--					:id="`settings-${id}-transition-time`"-->
			<!--					v-model.number="transitionSeconds"-->
			<!--					class="input"-->
			<!--					type="number"-->
			<!--					min="0"-->
			<!--					step="0.1"-->
			<!--				>-->
			<!--			</div>-->
		</template>
	</panel-wrapper>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import {timeoutPromise} from '../../util'

import panelMixin from '@/mixins/panel'

export default {
	mixins: [panelMixin],
	computed: {
		perRow: {
			get() {
				return this.settings.perRow
			},
			set(value) {
				this.setSetting('perRow', value)
			}
		},
		transitionScene: {
			get() {
				return this.settings.transitionScene
			},
			set(value) {
				this.setSetting('transitionScene', value)
			}
		},
		transitionSeconds: {
			get() {
				return this.settings.transitionSeconds || 0
			},
			set(value) {
				this.setSetting('transitionSeconds', value)
			}
		},
		onlyCurrent: {
			get() {
				return this.settings.onlyCurrent
			},
			set(value) {
				this.setSetting('onlyCurrent', value)
			}
		},
		...mapState('obs', {
			currentScene: state => state.scenes.current,
			previewScene: state => state.scenes.preview,
			scenes: state => state.scenes.list,
			studioMode: state => state.stream.studioMode
		})
	},
	methods: {
		async switchScenes(name) {
			if (name !== this.previewScene && !this.onlyCurrent && this.studioMode) {
				this.setPreview({name})
			} else {
				if (this.transitionScene && this.transitionSeconds > 0) {
					this.setScene({name: this.transitionScene})
					await timeoutPromise(this.transitionSeconds * 1000)
				}

				await this.setScene({name})
			}
		},
		...mapActions('obs', {
			setScene: 'scenes/current',
			setPreview: 'scenes/preview'
		})
	}
}
</script>
