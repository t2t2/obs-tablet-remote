<template>
	<panel-wrapper :content-class="['button-grid', 'has-per-row-1', 'overflow-y-auto']">
		<template slot="name">
			Mixer
		</template>

		<template
			v-if="audioSources"
			class="audio-devices"
		>
			<button
				v-for="source in audioSources"
				:id="source.name.replace(/\W/g,'-')"
				:key="source.name"
				:class="[source.muted ? 'is-inactive' : 'is-active']"
				class="button"
				@click="toggleMute({source: source.name, mute: !source.muted})"
				v-text="source.name"
			/>
		</template>
		<template v-else>
			Audio Device list is empty? ¯\_(ツ)_/¯
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
			audioSources: 'sources/audioSources'
		})
	},

	methods: {
		...mapActions('obs', {
			toggleMute: 'sources/mute'
		})
	}
}

</script>
