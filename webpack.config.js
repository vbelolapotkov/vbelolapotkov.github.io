const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    main: './src/js',
    styles: './src/styles/index.css'
  },
  output: {
    path: __dirname + '/assets',
    publicPath: '/assets/',
    filename: '[name].js'
  },

  // watch: NODE_ENV === 'development',
  devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : null,

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.js$/,
      include: /bootstrap\/js/,
      loader: 'imports',
      query: {
        jQuery: 'jquery'
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css!postcss')
    }]
  },

  postcss: function() {
    return [autoprefixer];
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new ExtractTextPlugin('[name].css')
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },


};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            unsafe: true
        },
        output: {
            comments: false,
        },
    })
  );
}
