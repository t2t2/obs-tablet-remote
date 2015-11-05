import 'tocca'
import Vue from 'vue'
import appOptions from '../app.vue'

var app = global.app = new Vue(appOptions).$mount('#app')