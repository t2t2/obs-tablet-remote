// THIS IS FOR eslint-import-resolver-webpack to properly resolve
const vbuild = require('vbuild')
const config = require('./vbuild.config')

module.exports = vbuild(config).getWebpackConfig()
