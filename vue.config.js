module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          pathRewrite: { '/api': '' }
        },
      },
    },
  },
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