<template>
	<panel-wrapper :content-class="['flex flex-col']">
		<template slot="name">
			Frame
		</template>
		<iframe
			:src="url"
			frameborder="0"
			class="flex-grow"
			style="width: 100%; height: 100%;"
		/>

		<template #settings>
			<div class="field">
				<label
					:for="`settings-${id}-url`"
					class="label"
				>URL</label>
				<input
					:id="`settings-${id}-url`"
					v-model="url"
					class="input"
					type="text"
				>
			</div>
		</template>
	</panel-wrapper>
</template>

<script>
import panelMixin from '@/mixins/panel'

export default {
	mixins: [panelMixin],
	computed: {
		url: {
			get() {
				if (this.settings.url) {
					return this.settings.url
				}

				return 'about:blank'
			},
			set(value) {
				this.setSetting('url', value)
			}
		}
	}
}
</script>
