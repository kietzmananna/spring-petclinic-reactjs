const path = require('path');
const webpack = require('webpack');

const port = process.env.PORT || 3000;

const entries = [
  'webpack-dev-server/client?http://0.0.0.0:' + port,
  'webpack/hot/only-dev-server',
  'react-hot-loader/patch',
  './src/main.tsx'
];


module.exports = {
  devtool: 'source-map',
  entry: entries,
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: 'bundle.js',
    publicPath: '/dist/'
    /* redbox-react/README.md */
    // ,devtoolModuleFilenameTemplate: '/[absolute-resource-path]'
  },
  devServer: {
    compress: true,
    allowedHosts: 'all',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __API_SERVER_URL__: JSON.stringify('http://0.0.0.0:8080')
    })
  ],
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js']
  },
  resolveLoader: {
    'fallback': path.join(__dirname, 'node_modules')
  },
  module: {
    preLoaders: [
      {
        test: /\.tsx?$/,
        loader: 'tslint',
        include: path.join(__dirname, 'src')
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less',
        include: path.join(__dirname, 'src/styles')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]'
      },

      {
        test: /\.tsx?$/,
        loader: 'babel!ts',
        include: path.join(__dirname, 'src')
      }
    ]
  },
  tslint: {
    emitErrors: true,
    failOnHint: true
  }
};
