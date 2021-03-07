/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");

module.exports = {
  // sass-loader
  // https://vue-loader.vuejs.org/zh/guide/pre-processors.html#sass
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/style/variables.scss";`,
      },
    },
  },
  configureWebpack: {
    externals: {
      mockjs: "Mock",
      axios: "axios",
      "markdown-it": "markdownit",
      "highlight.js": "hljs"
      // 左边是 import 的内容，右边是在CDN里export的对象
    },
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    ],
  },
};
