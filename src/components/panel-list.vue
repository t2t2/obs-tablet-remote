<template>
	<div>
		<div class="modal-header">
			<h2 class="title">Add Panel</h2>
			<button class="close" @click="$emit('close')"></button>
		</div>

		<a
			v-for="item in list"
			class="media"
			:class="{'is-disabled': !canBeAdded(item)}"
			:key="item.name"
			@click="addPanel(item)">
			<div class="media-left">
				<i class="material-icons md-48">{{ item.icon }}</i>
			</div>
			<div class="media-content">
				<h3 class="is-marginless">{{ item.name }}</h3>
				<p>{{ item.description }}</p>
			</div>
		</a>
	</div>
</template>

<script>
	const PANELS_INFO = [
		{
			name: 'Horizontal Splitter',
			description: 'Put more panels side by side!',
			icon: 'view_column',
			type: 'Grid',
			maxDepth: 2,
			defaults() {
				return {
					direction: 'row'
				}
			}
		},
		{
			name: 'Vertical Splitter',
			description: 'Stack panels on top of eachother',
			icon: 'view_stream',
			type: 'Grid',
			maxDepth: 2,
			defaults() {
				return {
					direction: 'column'
				}
			}
		},
		{
			name: 'Scenes Switcher',
			description: 'Switch the current scene',
			icon: 'video_label',
			type: 'Scenes'
		},
		{
			name: 'Sources List',
			description: 'Toggle sources on and off',
			icon: 'view_list',
			type: 'Sources'
		},
		{
			name: 'Stream Status',
			description: 'Manage stream & recording status',
			icon: 'movie',
			type: 'Stream'
		},
		{
			name: 'Set Transition',
			description: 'Set the current transition',
			icon: 'view_list', // TODO: figure this out (needs a different icon)
			type: 'Transitions'
		},
		{
			name: 'Frame',
			description: 'Embed any webpage',
			icon: 'web_asset',
			type: 'Iframe'
		}
	]

	export default {
		props: {
			parentId: {
				type: [Number, String],
				required: true
			},
			parentDepth: {
				type: Number,
				required: true
			}
		},
		computed: {
			list() {
				return PANELS_INFO
			}
		},
		methods: {
			addPanel(item) {
				if (!this.canBeAdded(item)) {
					return
				}
				this.$store.dispatch('layout/addPanel', {
					type: item.type,
					parent: this.parentId,
					settings: item.defaults ? item.defaults() : {}
				})
				this.$emit('close')
			},
			canBeAdded(item) {
				if (item.maxDepth) {
					return this.parentDepth < item.maxDepth
				}
				return true
			}
		}
	}
</script>
