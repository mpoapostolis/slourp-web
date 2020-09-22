const proxy = require("http-proxy-middleware");

const target = "http://139.59.131.160:4000/";

module.exports = function (app) {
  app.use(
    proxy("/api", {
      target,
      changeOrigin: true,
      secure: false,
      logLevel: "debug",
    }),
    proxy("/uploads", {
      target,
      changeOrigin: true,
      secure: false,
      logLevel: "debug",
    })
  );
};
