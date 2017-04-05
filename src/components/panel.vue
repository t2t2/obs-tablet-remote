<template>
	<div class="panel">
		<div class="panel-header">
			<div class="panel-name">
				<slot name="name" />
			</div>
			<button v-if="hasSettings" @click="settingsOpen = !settingsOpen">
				<i class="material-icons">settings</i>
			</button>
			<button v-if="!root" @click="remove">
				<i class="material-icons">delete_forever</i>
			</button>
		</div>
		<div v-if="!editing || isGrid" class="panel-content" :class="contentClass">
			<slot />
		</div>
		<overlay class="overlay" v-if="settingsOpen" @overlay-click="settingsOpen = false">
			<div class="modal-header">
				<h2 class="title">Settings</h2>
				<button class="close" @click="settingsOpen = false"></button>
			</div>
			<slot name="settings" />
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
			},
			hasSettings() {
				return Boolean(this.$slots.settings)
			}
		},
		data() {
			return {
				settingsOpen: false
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
		},
		watch: {
			editing(newval) {
				if (!newval) {
					this.settingsOpen = false
				}
			}
		}
	}
</script>
