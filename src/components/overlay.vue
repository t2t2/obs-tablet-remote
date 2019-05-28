<template>
	<div
		v-show="show"
		class="fixed inset-0 bg-overlay z-30 flex items-center justify-center"
		@click.self="$emit('close')"
	>
		<div
			class="w-full md:w-2/5 bg-white text-gray-800 color-modal max-h-full overflow-y-auto"
			:class="modalClass"
		>
			<div class="p-4">
				<div class="flex mb-4 justify-between items-start">
					<h2 class="text-2xl leading-none">
						<slot name="title" />
					</h2>
					<button
						class="bg-gray-400 hover:bg-gray-500 text-gray-800 leading-none text-center w-8 h-8 rounded-full"
						title="Close"
						@click="$emit('close')"
					>
						<FontAwesomeIcon
							icon="times"
							size="lg"
							fixed-width
						/>
					</button>
				</div>
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: true
		},
		wide: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		modalClass({wide}) {
			const classes = []
			if (wide) {
				classes.push('md:w-4/5')
			}

			return classes
		}
	}
}
</script>
