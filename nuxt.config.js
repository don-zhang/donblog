const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'DONZ.RUN - 前端开发, 前端技术文章, 分享, Front-end, Frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'DONZ.RUN - 前端开发, 前端技术文章, 分享, Front-end, Frontend' }
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
    { src: '@/plugins/mavon-editor', ssr: false },
    '@/plugins/highlight'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: []
}
