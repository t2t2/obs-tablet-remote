import { EventEmitter } from 'events';
import ws from 'ws'
import Sha256Hash from 'sha.js/sha256'

export default
class OBSRemote extends EventEmitter {

	/**
	 * Create an instance of OBS remote connection
	 *
	 * @param host
	 * @param port
	 */
	constructor(host = 'localhost', port = 4444) {
		super()

		this.host = host
		this.port = port

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
	connect() {
		if (this._socket) {
			this._socket.onopen = this._socket._onmessage = this._socket.onerror = this._socket._onclose = null
			this._socket.close();
		}

		return new Promise((resolve, reject) => {
			this._connecting = {resolve, reject}

			let url = 'ws://' + this.host + ':' + this.port
			this._socket = ws(url, 'obsapi')

			this._socket.onopen = socketOnOpen.bind(this)
			this._socket.onmessage = socketOnMessage.bind(this)
			this._socket.onerror = socketOnError.bind(this)
			this._socket.onclose = socketOnClose.bind(this)
		})
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
				var id = this._nextID()
				this._promises[id] = {resolve, reject}

				message['message-id'] = id

				this._socket.send(JSON.stringify(message))
			} else {
				throw new Error("Connection isn't opened");
			}
		})
	}

	/**
	 * Convenience method for logging in
	 *
	 * @param password
	 * @returns {Promise}
	 */
	login(password) {
		return this.getAuthRequired().then(({authRequired, salt, challenge}) => {
			if(authRequired) {
				if (!password) {
					throw 'Password Required'
				}

				let authHash = new Sha256Hash();
				authHash.update(password);
				authHash.update(salt);
				authHash = authHash.digest('base64');

				let authResponse = new Sha256Hash();
				authResponse.update(authHash);
				authResponse.update(challenge);
				authResponse = authResponse.digest('base64');

				return this.authenticate(authResponse).then((response) => {
					console.log(response)
					return response
				}, (error) => {
					throw error.error
				})
			} else {
				return true
			}
		})
	}

	authenticate(auth) {
		return this.send({
			'request-type': 'Authenticate',
			auth,
		})
	}

	getAuthRequired() {
		return this.send({'request-type': 'GetAuthRequired'})
	}

	getVersion() {
		return this.send({'request-type': 'GetVersion'})
	}

	_nextID() {
		return this._idCounter++ + '';
	}
}

/**
 * Handle socket opening
 */
function socketOnOpen() {
	if (this._connecting) {
		var resolve = this._connecting.resolve
		Promise.all([this.getVersion(), this.getAuthRequired()]).then(([version, authRequired]) => {
			resolve({
				version: version.version,
				auth:    authRequired.authRequired,
			})
		});
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
	var received;
	try {
		received = JSON.parse(message.data);
	} catch (e) {
		this.emit('error', e);
	}

	if (!received) {
		return
	}

	var type = received['update-type'];
	if (type) {
		this._handleUpdate(type, received);
	} else {
		handleCallback.call(this, received['message-id'], received);
	}

}

/**
 * Handle socket errors
 *
 * @param error
 */
function socketOnError(error) {
	console.log('error', error)
	this.emit('socket.error', error)
}

var disconnectReasons = {
	1006: 'Server not reachable',
}

/**
 * Handle socket close events
 *
 * @param event
 */
function socketOnClose(event) {
	if (this._connecting) {
		let reason = 'Unknown Error';
		if (event.code in disconnectReasons) {
			reason = disconnectReasons[event.code]
		}
		this._connecting.reject({reason, event})
		this._connecting = null
	}

	this.emit('socket.close', event)
	console.log('close', arguments)
}

/**
 * Handle responses from server
 *
 * @param id
 * @param message
 */
function handleCallback(id, message) {
	var promise = this._promises[id];
	if (promise) {
		if (message['status'] == 'error') {
			promise.reject(message);
		} else {
			promise.resolve(message);
		}
		delete this._promises[id];
	} else if (message['status'] == 'error') {
		this.emit('error', message['error'], message);
	}
}