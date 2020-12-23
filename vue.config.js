module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "./src/style/base.scss";
        @import "./src/style/mixin.scss";
        `,
      },
    },
  },
}