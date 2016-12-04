import Vue from 'vue'
import App from '../App'

const app = new Vue({
	el: '#app',
	render: h => h(App, {ref: 'app'})
})

global.app = app.$refs.app
