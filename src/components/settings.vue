<template>
	<overlay modal-class="wide" @overlay-click="showSettings(false)">
		<div class="modal-header">
			<h2 class="title">Global Settings</h2>
			<button class="close" @click="showSettings(false)"></button>
		</div>

	</overlay>
</template>

<script>
	import {mapMutations} from 'vuex'

	import Overlay from './overlay'

	export default {
		components: {
			Overlay
		},
		methods: {
			...mapMutations(['showSettings'])
		}
	}
</script>
