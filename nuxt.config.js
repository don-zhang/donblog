var CopyWebpackPlugin = require('copy-webpack-plugin')
var path = require('path')
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#7871af', height: '4px' },
  /*
  ** Global CSS
  */
  css: [
    'assets/main.css',
    'ant-design-vue/dist/antd.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/antd-ui',
    { src: '@/plugins/mavon-editor', ssr: false }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: 'node_modules/mavon-editor/dist/highlightjs',
        to: path.resolve(__dirname, 'static/highlightjs'), // 插件将会把文件导出于/dist/highlightjs之下
      }, {
        from: 'node_modules/mavon-editor/dist/markdown',
        to: path.resolve(__dirname, 'static/markdown'), // 插件将会把文件导出于/dist/markdown之下
      }, {
        from: 'node_modules/mavon-editor/dist/katex', // 插件将会把文件导出
        to: path.resolve(__dirname, 'static/katex')
      }])
    ]
  }
}
