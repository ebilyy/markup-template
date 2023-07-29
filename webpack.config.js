const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

const pages = require('./src/data/pages');

const createPages = (pages) => {
  const entries = {};
  pages.forEach((page) => {
    entries[page.path] = {
      import : page.view,
      data: page.data,
    }
  });
  return entries;
};

module.exports = {
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist/'),
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: createPages(pages),
      js: {
        // output filename of extracted JS
        filename: 'assets/js/[name].[contenthash:8].js',
      },
      css: {
        // output filename of extracted CSS
        filename: 'assets/css/[name].[contenthash:8].css',
      },
      // use the template engine 'nunjucks' for compilation of entries
      preprocessor: 'nunjucks',
    }),
  ],

  module: {
    rules: [
      // styles
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'sass-loader'],
      },
      // images
      {
        test: /\.(png|jpe?g|ico|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]',
        },
      },
    ],
  },

  // enable HMR with live reload
  devServer: {
    open: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },
};
