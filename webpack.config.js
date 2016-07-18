var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

const srcPath = path.join(__dirname, 'src');

module.exports = {
	entry: {
		index: './src/index.js',
		style: './src/css/index.css'
	},
	output: {
		path: './dist',
		filename: '[name].js',
		publicPath: '/dist/'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
			},
		]
	},
	devtool: 'sourcemap',
	plugins: [
		new ExtractTextPlugin('[name].css', {allChunks: true}),
		new HtmlWebpackPlugin({
			title: 'webpack-html-plugin'
		})
	],
	resolve: {
		extensions: ['', '.js', '.css'],
		modulesDirectories: ['node_modules'],
		alias: {
			css: path.join(srcPath, 'css')
		},
		root: [srcPath]
	},
	postcss: function () {
		return [
			require('autoprefixer')({browsers: ['last 2 versions', 'ie >= 11'], cascade: false}),
			require('postcss-csso')()
		];
	}
};
