const { createProxyMiddleware } = require("http-proxy-middleware");

const isDevMode = process.env.NODE_ENV === "development";

module.exports = function (app) {
  const originUrl = isDevMode ? "/api" : "/cryptogalaxy/api";
  app.use(
    originUrl,
    createProxyMiddleware({
      target: "https://upbit-next-proxy.vercel.app/api",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
