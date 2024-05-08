const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/poc_service', {
      target: 'http://[::1]:9091',
      changeOrigin: true,
      secure: false
    })
  )
}