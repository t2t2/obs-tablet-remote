// THIS IS FOR eslint-import-resolver-webpack to properly resolve
const poi = require('poi')
const config = require('./poi.config')

module.exports = poi(config).getWebpackConfig()
