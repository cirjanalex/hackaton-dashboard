module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.less$/i,
          loader: [
            // compiles Less to CSS           
            "less-loader"
          ],
        },
      ],
    }
  }
}
