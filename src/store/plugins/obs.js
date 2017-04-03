import OBSRemote from '../../obs-remote'

import * as actions from './obs/actions'
import * as getters from './obs/getters'
import modules from './obs/modules'
import * as mutations from './obs/mutations'

const state = {
	connection: false
}

export default function (store) {
	const client = store._obs = new OBSRemote();

	if (process.env.NODE_ENV === 'development') {
		client.debug = console.log.bind(console, 'obs')
	}

	store.registerModule('obs', {
		namespaced: true,
		state,
		actions: {
			...actions,
			'connection/authNeeded'({ commit }) {
				commit('connectionAuthNeeded')
			},
			'connection/closed'({ commit }) {
				commit('connectionClosed')
			},
			'connection/ready'({ commit }) {
				commit('connectionReady')
			},
			'connection/started'({ commit }) {
				commit('connectionStarted')
			}
		},
		mutations,
		getters: {
			...getters,
			client() {
				return client
			}
		},
		modules
	})

	client.on('socket.open', () => store.dispatch('obs/connection/started'))
	client.on('socket.auth', () => store.dispatch('obs/connection/authNeeded'))
	client.on('socket.ready', () => store.dispatch('obs/connection/ready'))
	client.on('socket.close', () => store.dispatch('obs/connection/closed'))
	client.on('event', message => {
		store.dispatch(`obs/event/${message['update-type']}`, message)
	})
}
