import Vue from 'vue'
import './icons' // eslint-disable-line import/no-unassigned-import

import store from './store'
import App from './app'

Vue.filter('capitalize', value => {
	if (!value) {
		return ''
	}

	value = value.toString()
	return value.charAt(0).toUpperCase() + value.slice(1)
})

const app = new Vue({
	el: '#app',
	store,
	render: h => h(App, {ref: 'app'})
})

global.app = app.$refs.app
