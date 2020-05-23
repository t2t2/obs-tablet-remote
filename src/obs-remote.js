import EventEmitter from 'eventemitter3'
import Sha256Hash from 'sha.js/sha256'

export default class OBSRemote extends EventEmitter {
	constructor() {
		super()

		this.debug = () => {}

		this._connecting = null
		this._idCounter = 1
		this._promises = {}
		this._socket = undefined
	}

	/**
	 * Connect to OBS remote
	 *
	 * @returns {Promise}
	 */
	connect(host = 'localhost', port = 4444) {
		if (this._socket) {
			this._socket.addEventListener('open', null)
			this._socket.addEventListener('message', null)
			this._socket.addEventListener('error', null)
			this._socket.onclose = null
			this._socket.close()
		}

		return new Promise((resolve, reject) => {
			this._connecting = {resolve, reject}

			const protocol = (host.startsWith('ws://') || host.startsWith('wss://')) ? '' : 'ws://'
			const url = protocol + host + (port ? ':' + port : '')
			this._socket = new WebSocket(url)

			this._socket.addEventListener('open', socketOnOpen.bind(this))
			this._socket.addEventListener('message', socketOnMessage.bind(this))
			this._socket.addEventListener('error', socketOnError.bind(this))
			this._socket.onclose = socketOnClose.bind(this)
		})
	}

	/**
	 * Close socket connection
	 */
	close() {
		if (this._socket) {
			this._socket.close()
		}
	}

	/**
	 * Sends raw message to OBS remote
	 *
	 * @param message
	 * @returns {Promise}
	 */
	send(message) {
		return new Promise((resolve, reject) => {
			if (this._socket) {
				const id = this._nextID()
				this._promises[id] = {resolve, reject}

				message['message-id'] = id

				this.debug('send', message)

				this._socket.send(JSON.stringify(message))
			} else {
				throw new Error('Connection isn\'t opened')
			}
		})
	}

	/**
	 * Convenience method for logging in
	 *
	 * @param password
	 * @returns {Promise}
	 */
	async login(password) {
		const {authRequired, salt, challenge} = await this.send({'request-type': 'GetAuthRequired'})

		if (!authRequired) {
			this.emit('socket.ready')
			return true
		}

		if (!password) {
			throw new Error('Password Required')
		}

		const authHash = new Sha256Hash()
		authHash.update(password)
		authHash.update(salt)
		const authResponse = new Sha256Hash()
		authResponse.update(authHash.digest('base64'))
		authResponse.update(challenge)
		const auth = authResponse.digest('base64')

		await this.send({
			'request-type': 'Authenticate',
			auth
		})
		this.emit('socket.ready')

		return true
	}

	/**
	 * Get ID for next request
	 *
	 * @returns {string}
	 * @private
	 */
	_nextID() {
		return String(this._idCounter++)
	}
}

/**
 * Handle socket opening
 */
function socketOnOpen() {
	if (this._connecting) {
		const {resolve, reject} = this._connecting

		this.send({'request-type': 'GetAuthRequired'}).then(({authRequired}) => {
			resolve({authRequired})

			if (authRequired) {
				this.emit('socket.auth')
			} else {
				this.emit('socket.ready')
			}
		}, error => reject(error))

		this._connecting = null
	}

	this.emit('socket.open')
}

/**
 * Handle socket messages
 *
 * @param message
 */
function socketOnMessage(message) {
	let received
	try {
		received = JSON.parse(message.data)
	} catch (error) {
		this.emit('error', error)
	}

	if (!received) {
		return
	}

	this.debug('receive', received)

	const type = received['update-type']
	if (type) {
		handleUpdate.call(this, type, received)
	} else {
		handleCallback.call(this, received['message-id'], received)
	}
}

/**
 * Handle socket errors
 *
 * @param error
 */
function socketOnError(error) {
	this.emit('socket.error', error)
}

const disconnectReasons = {
	1006: 'Server not reachable'
}

/**
 * Handle socket close events
 *
 * @param event
 */
function socketOnClose(event) {
	if (this._connecting) {
		let message = 'Unknown Error'
		if (event.code in disconnectReasons) {
			message = disconnectReasons[event.code]
		} else if (event.message) {
			message = event.message
		}

		const error = new Error(message)
		error.event = event

		this._connecting.reject(error)
		this._connecting = null
	}

	this.emit('socket.close')
}

/**
 * Handle responses from server
 *
 * @param id
 * @param message
 */
function handleCallback(id, message) {
	const promise = this._promises[id]
	if (promise) {
		if (message.status === 'error') {
			promise.reject(new Error(message.error))
		} else {
			promise.resolve(message)
		}

		delete this._promises[id]
	} else if (message.status === 'error') {
		this.emit('error', message.error, message)
	}
}

/**
 * Handle general updates
 *
 * @param type
 * @param message
 */
function handleUpdate(type, message) {
	this.emit('event', message)
	this.emit(type, message)
}
