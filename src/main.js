import Vue from 'vue'
import './icons' // eslint-disable-line import/no-unassigned-import

import store from './store'
import App from './app'

const app = new Vue({
	el: '#app',
	store,
	render: h => h(App, {ref: 'app'})
})

global.app = app.$refs.app
