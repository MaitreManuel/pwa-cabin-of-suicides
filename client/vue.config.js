module.exports = {
    configureWebpack: {
    devServer: {
      host: '0.0.0.0',
      hot: true,
      https: true,
      port: 3000,
      watchOptions: {
        poll: true
      }
    }
  },
  outputDir: 'dist',
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? './' // prod
    : '/' // dev
};
