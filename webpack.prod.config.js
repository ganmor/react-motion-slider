var path = require('path');
var webpack = require('webpack');
var TARGET = process.env.TARGET || null;

var config = {
  entry: {
    index: './src/react-motion-slider.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'react-motion-slider.js',
    sourceMapFilename: 'react-motion-slider.sourcemap.js',
    library: 'Slider',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['add-module-exports']
        }
      },
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-motion': 'ReactMotion'
  },
};

if (TARGET === 'minify') {
  config.output.filename = 'react-motion-slider.min.js';
  config.output.sourceMapFilename = 'react-motion-slider.min.js';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['React', 'ReactDOM', 'ReactMotion', 'Slider']
    }
  }));
}

module.exports = config;
