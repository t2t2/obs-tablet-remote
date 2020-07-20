<template>
	<panel-wrapper content-class="flex flex-col">
		<template slot="name">
			Sources
		</template>
		<div class="p-2 relative h-10">
			<h3 class="text-center font-bold">
				{{ viewScene ? viewScene.name : 'Unknown Scene' }}
			</h3>
			<button
				title="Refresh scene browser"
				class="button absolute top-0 right-0"
				@click="viewScene ? refreshSceneBrowsers(viewScene.name) : {}"
			>
				<FontAwesomeIcon
					icon="redo"
					fixed-width
					color="orange"
				/>
			</button>
		</div>
		<div
			v-if="viewScene"
			class="flex-grow button-grid has-per-row-1 overflow-y-auto"
		>
			<button
				v-for="source in viewScene.sources"
				:key="source.name"
				class="button relative"
				:class="[source.render ? 'is-active' : 'is-inactive']"
				@click="setRender({scene: viewScene.name, source: source.name, render: !source.render})"
			>
				<span
					:title="source.name"
					class="w-1/5 h-full max-w-2 title-zone absolute left-0 top-0"
					@click.stop
				></span>
				<span>{{ source.name }}</span>
			</button>
		</div>
		<div v-else>
			Unknown scene, this should not happen :(
		</div>

		<template #settings>
			<div class="field">
				<p class="label">
					View:
				</p>
				<button
					:class="settings.view === 'preview' ? 'is-active' : 'is-inactive'"
					class="button"
					@click="setSetting('view', 'preview')"
				>
					<span>Preview</span>
				</button>
				<button
					:class="settings.view === 'current' ? 'is-active' : 'is-inactive'"
					class="button"
					@click="setSetting('view', 'current')"
				>
					<span>Current</span>
				</button>
			</div>
		</template>
	</panel-wrapper>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import panelMixin from '@/mixins/panel'

export default {
	mixins: [panelMixin],
	computed: {
		...mapGetters('obs', {
			previewOrCurrentScene: 'scenes/previewOrCurrentScene',
			currentScene: 'scenes/currentScene'
		}),
		...mapGetters('obs', ['']),
		viewScene() {
			if (this.settings.view === 'preview') {
				return this.previewOrCurrentScene
			}

			return this.currentScene
		}
	},
	methods: {
		...mapActions({
			setRender: 'obs/sources/render'
		}),
		...mapActions('obs', {
			refreshSceneBrowsers: 'sources/refreshSceneBrowsers',
			refreshBrowser: 'sources/refreshBrowser'
		})
	}
}
</script>
