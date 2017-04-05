import Vue from 'vue'

import store from './store'
import App from './components/app'

const app = new Vue({
	el: '#app',
	store,
	render: h => h(App, {ref: 'app'})
})

global.app = app.$refs.app
