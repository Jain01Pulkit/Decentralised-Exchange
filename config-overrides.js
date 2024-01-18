const webpack = require("webpack");
// const Buffer = require("buffer");
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = function (config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    fs: false,
    crypto: require.resolve("crypto-browserify"),
    // zlib: require.resolve("browserify-zlib"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    // new NodePolyfillPlugin({
    //     excludeAliases: ["console"],
    // }),
  ]);
  return config;
};
