import path from 'path'

import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import merge from 'webpack-merge'
import WebpackNotifierPlugin from 'webpack-notifier'

const BASE_SETTINGS = {
	entry: {
		app: ['babel-polyfill', './src/javascripts/boot/main.js', './src/stylesheets/app.scss']
	},
	output: {
		filename: 'assets/[name].js',
		path: path.resolve(__dirname, 'public'),
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.vue']
	},
	module: {
		rules: [
			{test: /\.vue$/, loader: 'vue-loader'},
			{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
			{test: /\.json$/, loader: 'json-loader'},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					loader: ['css-loader', 'postcss-loader', 'sass-loader'],
					fallbackLoader: 'style-loader'
				})
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: 'assets/img/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: 'assets/fonts/[name].[hash:7].[ext]'
				}
			}
		]
	}
}

const DEV_SETTINGS = {
	devtool: 'inline-source-map',
	plugins: [
		new ExtractTextPlugin({
			disable: true // Leave it to hot reloading
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"'
			}
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/html/index.html',
			inject: true
		}),
		new webpack.NamedModulesPlugin(),
		new WebpackNotifierPlugin()
	],
	devServer: {
		contentBase: false,
		inline: true,
		hot: true,
		noInfo: true
	}
}

const PROD_SETTINGS = {
	output: {
		filename: 'assets/[name].[chunkhash].js'
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'assets/[name].[contenthash].css'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/html/index.html',
			inject: true
		})
	]
}

export default function ({
	deploy = false,
	prod = false
} = {}) {
	let settings
	if (prod) {
		settings = merge(BASE_SETTINGS, PROD_SETTINGS)
	} else {
		settings = merge(BASE_SETTINGS, DEV_SETTINGS)
	}

	if (deploy) {
		settings = merge(settings, {
			output: {
				publicPath: '/obs-tablet-remote/'
			}
		})
	}

	return settings
}
