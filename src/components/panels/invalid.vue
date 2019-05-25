<template>
	<panel-wrapper :content-class="['panel-invalid', 'is-scrollable']">
		<template slot="name">
			Unknown Panel
		</template>
		<div class="panel-invalid-content">
			<p>PANEL NOT FOUND</p>
			<p>Panel type "{{ panel.type }}" not found. Use edit mode to remove this panel.</p>
		</div>
	</panel-wrapper>
</template>

<script>
import panelMixin from '@/mixins/panel'

export default {
	mixins: [panelMixin]
}
</script>
