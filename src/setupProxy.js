const { createProxyMiddleware } = require("http-proxy-middleware");

const isDevMode = process.env.NODE_ENV === "development";

//this only works for localhost
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
