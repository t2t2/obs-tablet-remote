<template>
	<panel-wrapper
		wide-settings
		:content-class="['button-grid', 'has-per-row-' + perRow, 'overflow-y-auto', 'flex-wrap', 'text-3xl']">

		<template #name>
			Scenes
		</template>

		<button
			v-for="scene in filteredScenes"
			:key="scene.name"
			class="button relative"
			:class="[scene.name === currentScene ? 'is-active' :
				scene.name === previewScene ? 'is-preview-scene' :
				'is-inactive']"
			@click="switchScenes(scene.name)"
		>
			<span
				:title="scene.name"
				class="w-1/5 h-1/4 max-w-2 title-zone absolute left-0 top-0"
				@click.stop
			></span>
			<span>{{ scene.name }}</span>
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
			<div class="flex -mx-2 mb-2">
				<div class="w-1/2 px-2">
					<div class="field">
						<div class="flex">
							<label
								:for="`settings-${id}-only-current`"
								class="label"
							>
								Only current
							</label>
							<input
								:id="`settings-${id}-only-current`"
								v-model="onlyCurrent"
								class="ml-2 mt-1"
								type="checkbox"
							>
						</div>
					</div>
				</div>
			</div>
			<div class="flex -mx-2">
				<div class="w-1/2 px-2">
					<div class="field">
						<label
							:for="`settings-${id}-prefixes-to-hide`"
							class="label"
						>Prefixes to hide (sep: '; ')</label>
						<input
							:id="`settings-${id}-prefixes-to-hide`"
							v-model="prefixesToHide"
							class="input"
							type="text"
						>
					</div>
				</div>
				<div class="w-1/2 px-2">
					<div class="field">
						<label
							:for="`settings-${id}-hide-by-tag`"
							class="label"
						>Hide by tag</label>
						<input
							:id="`settings-${id}-hide-by-tag`"
							v-model="hideByTag"
							class=""
							type="checkbox"
						>
					</div>
				</div>
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
		hideByTag: {
			get() {
				return this.settings.hideByTag
			},
			set(value) {
				this.setSetting('hideByTag', value)
			}
		},
		prefixesToHide: {
			get() {
				return this.settings.prefixesToHide
			},
			set(value) {
				this.setSetting('prefixesToHide', value)
			}
		},
		...mapState('obs', {
			currentScene: state => state.scenes.current,
			previewScene: state => state.scenes.preview,
			scenes: state => state.scenes.list,
			studioMode: state => state.stream.studioMode
		}),
		filteredScenes() {
			let scenes = [...this.scenes] // No need to clone since don't work with inner content

			if (this.hideByTag && this.prefixesToHide) {
				const prefixesToHideArray = this.prefixesToHide.split('; ')
				for (const prefix of prefixesToHideArray) {
					scenes = scenes.filter(scene => !scene.name.startsWith(prefix))
				}
			}

			// ...more filters )

			return scenes
		}
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
