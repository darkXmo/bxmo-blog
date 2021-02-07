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
};