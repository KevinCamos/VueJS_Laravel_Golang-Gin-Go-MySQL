
  module.exports = {

    devServer: {
        proxy: {
          "http://localhost:8040/api/": {
          target: url,
          ws: true,
          changeOrigin: true
        }
     }
  },
}