export async function authenticate({getters: {client}}, {password}) {
	const result = await client.login(password)

	return result
}

export async function connect({getters: {client}, commit}, {host, port}) {
	commit('connectionStarting')

	const result = await client.connect(host, port)

	return result
}

export function disconnect({getters: {client}}) {
	client.close()
}
