// Dynamic component resolver
import panelMixin from '../mixins/panel'

import Grid from './grid'
import Iframe from './iframe'
import Invalid from './invalid'
import Scenes from './scenes'
import Sources from './sources'
import Stream from './stream'
import Transitions from './transitions'

const components = {
	Grid,
	Iframe,
	Invalid,
	Scenes,
	Sources,
	Transitions,
	Stream
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
