<template>
	<div>
		<div class="modal-header">
			<h2 class="title">Add Panel</h2>
			<button class="close" @click="$emit('close')"></button>
		</div>

		<a v-for="item in list"
			class="media"
			:class="{'is-disabled': !canBeAdded(item)}"
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
			maxDepth: 1,
			defaults() {
				return {
					direction: 'row'
				}
			}
		},
		{
			name: 'Scenes Switcher',
			description: 'Switch the current scene',
			icon: 'video_label',
			type: 'Scenes'
		}
	]

	export default {
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
					return this.parentDepth <= item.maxDepth
				}
				return true
			}
		},
		props: {
			parentId: {
				type: [Number, String],
				required: true
			},
			parentDepth: {
				type: Number,
				required: true
			}
		}
	}
</script>
