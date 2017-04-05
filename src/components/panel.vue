<template>
	<div class="panel">
		<div class="panel-header">
			<div class="panel-name">
				<slot name="name"></slot>
			</div>
			<button v-if="!root" @click="remove">
				<i class="material-icons">delete_forever</i>
			</button>
		</div>
		<div v-if="!editing || isGrid" class="panel-content" :class="contentClass">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		computed: {
			...mapState(['editing']),
			id() {
				return this.$parent.id
			},
			panel() {
				return this.$parent.panel
			},
			root() {
				return this.$parent.root
			}
		},
		methods: {
			remove() {
				this.$store.dispatch('layout/removePanel', {id: this.id})
			}
		},
		props: {
			contentClass: null,
			isGrid: {
				type: Boolean,
				default: () => false
			}
		}
	}
</script>
