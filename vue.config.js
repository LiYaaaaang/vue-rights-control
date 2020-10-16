module.exports = {
  devServer: {
    port: 8081,
    before: require('./mock/index.js') // 引入mock/index.js
  },
  lintOnSave: false
}
