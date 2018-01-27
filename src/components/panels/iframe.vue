<template>
	<panel-wrapper :content-class="['panel-iframe']">
		<template slot="name">Frame</template>
		<iframe
			:src="url"
			frameborder="0"
			style="width: 100%; height: 100%;"
		></iframe>

		<div slot="settings">
			<label>
				URL
				<div class="input-group">
					<input
						type="text"
						v-model="url"
					>
				</div>
			</label>
		</div>
	</panel-wrapper>
</template>

<script>
	import panelMixin from '../mixins/panel'

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
