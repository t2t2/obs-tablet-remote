export function parseHashBang() {
	// https://gist.github.com/zaus/5201739
	const vars = {}
	const hashes = location.hash.slice(location.hash.indexOf('#!') + 2).split('&')
	for (let i = hashes.length; i--;) {
		const hash = hashes[i].split('=')
		vars[hash[0]] = hash.length > 1 ? hash[1] : null
	}
	return vars
}
