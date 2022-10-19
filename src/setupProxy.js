const { createProxyMiddleware } = require("http-proxy-middleware");

const isDevMode = process.env.NODE_ENV === "development";

module.exports = function (app) {
  const originApiUrl = isDevMode ? "/api" : "/cryptogalaxy/api";
  app.use(
    originApiUrl,
    createProxyMiddleware({
      target: "https://upbit-next-proxy.vercel.app/api",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
