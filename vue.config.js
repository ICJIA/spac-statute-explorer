module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.module
      .rule("wasm")
      .test(/\.wasm$|\.db$/)

      .type("javascript/auto");
  },
};
