import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex, {Store} from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

import layout from './modules/layout'
import settings from './modules/settings'

import obs from './plugins/obs'

Vue.use(Vuex)

const state = {
	editing: false
}

const store = new Store({
	state,
	getters,
	actions,
	mutations,
	modules: {
		layout,
		settings
	},
	plugins: [obs, createPersistedState({
		key: 'obs-remote-tablet-vuex',
		paths: ['layout', 'settings']
	})]
})

if (module.hot) {
	module.hot.accept(['./actions', './getters', './modules/layout', './modules/settings', './mutations'], () => {
		store.hotUpdate({
			getters: require('./getters'),
			actions: require('./actions'),
			mutations: require('./mutations'),
			modules: {
				layout: require('./modules/layout').default,
				settings: require('./modules/settings').default
			}
		})
	})
}

export default store
