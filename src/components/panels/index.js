// Dynamic component resolver
import panelMixin from '../mixins/panel'

import GridX from './grid-x'
import Invalid from './invalid'
import Scenes from './scenes'

const components = {
	GridX,
	Invalid,
	Scenes
}

export default {
	functional: true,
	render(h, context) {
		const type = context.props.panel ? context.props.panel.type : 'Invalid'
		const component = type in components ? components[type] : components.Invalid
		return h(component, {
			...context.data,
			props: context.props
		}, context.children)
	},
	props: panelMixin.props
}
