<template>
	<panel-wrapper :content-class="['overflow-y-auto', 'flex', 'flex-col']">
		<template slot="name">
			Mixer
		</template>

		<template
			v-if="audioSources"
		>
			<AudioSource
				v-for="source in audioSources"
				:key="source.name"
				:source="source"
			/>
		</template>
		<template v-else>
			Audio Device list is empty? ¯\_(ツ)_/¯
		</template>
	</panel-wrapper>
</template>

<script>
import {mapGetters} from 'vuex'
import AudioSource from './mixer/source'
import panelMixin from '@/mixins/panel'

export default {

	components: {
		AudioSource
	},

	mixins: [panelMixin],

	computed: {
		...mapGetters('obs', {
			audioSources: 'sources/audioSources'
		})
	}
}

</script>
