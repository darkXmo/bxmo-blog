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
      'mockjs': "Mock",
      'axios': "axios"
    // 前面的vue指的是使用时的名字，后面的Vue是加载的包名
    }
  }
};