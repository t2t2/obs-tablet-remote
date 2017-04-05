import pickBy from 'lodash/pickBy'

export function getPanelsFor(state) {
	return parent => pickBy(state.panels, panel => panel.parent === parent)
}
