import Vue from 'vue'

export function removePanel(state, {id}) {
	Vue.delete(state.panels, id)
}
