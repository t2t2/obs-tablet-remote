<template>
	<div class="panel">
		<div class="panel-header">
			<div class="panel-name">
				<slot name="name"></slot>
			</div>
			<button v-if="hasSettings" @click="settingsOpen = !settingsOpen">
				<i class="material-icons">settings</i>
			</button>
			<button v-if="depth > 0" @click="remove">
				<i class="material-icons">delete_forever</i>
			</button>
		</div>
		<div v-if="!editing || isGrid" class="panel-content" :class="contentClass">
			<slot></slot>
		</div>
		<overlay v-if="settingsOpen" @overlay-click="settingsOpen = false">
			<div class="modal-header">
				<h2 class="title">Settings</h2>
				<button class="close" @click="settingsOpen = false"></button>
			</div>
			<slot name="settings"></slot>
		</overlay>
	</div>
</template>

<script>
	import {mapState} from 'vuex'

	import Overlay from './overlay'

	export default {
		components: {
			Overlay
		},
		props: {
			contentClass: null,
			isGrid: {
				type: Boolean,
				default: () => false
			}
		},
		data() {
			return {
				settingsOpen: false
			}
		},
		computed: {
			...mapState(['editing']),
			depth() {
				return this.$parent.depth
			},
			id() {
				return this.$parent.id
			},
			panel() {
				return this.$parent.panel
			},
			hasSettings() {
				return Boolean(this.$slots.settings)
			}
		},
		watch: {
			editing(newval) {
				if (!newval) {
					this.settingsOpen = false
				}
			}
		},
		methods: {
			remove() {
				this.$store.dispatch('layout/removePanel', {id: this.id})
			}
		}
	}
</script>
