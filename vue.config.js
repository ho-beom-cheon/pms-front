const webpack = require('webpack');
const path = require('path');
module.exports = {
  outputDir: path.resolve(__dirname + '/dist'),
  indexPath: "../dist/index.html",
  devServer: {
    //disableHostCheck: true,
    port:8081,
    // proxy: {
    //     '^/': {
    //       target:  'http://localhost:8080',
    //     }
    // }
  },
  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  },
  // pwa: {
  //   name: 'Vue Argon Design',
  //   themeColor: '#172b4d',
  //   msTileColor: '#172b4d',
  //   appleMobileWebAppCapable: 'yes',
  //   appleMobileWebAppStatusBarStyle: '#172b4d'
  // },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};