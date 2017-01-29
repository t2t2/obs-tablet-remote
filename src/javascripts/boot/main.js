import Vue from 'vue'
import App from '../app'

const app = new Vue({
	el: '#app',
	render: h => h(App, {ref: 'app'})
})

global.app = app.$refs.app
