const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://upbit-next-proxy.vercel.app/api",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
