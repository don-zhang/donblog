const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const cors = require('@koa/cors')
const route = require('./router')   // 路由中间件
const app = new Koa()

app.use(cors())
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app.use(route.routes(), route.allowedMethods())   // 启动路由及路由出错的处理逻辑
  app.use((ctx) => {
    if (ctx.url.indexOf('/api') === -1) {
      ctx.status = 200
      ctx.respond = false // Bypass Koa's built-in response handling
      ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
      nuxt.render(ctx.req, ctx.res)
    }
  })
  app.listen(port, host)
  consola.ready({
    message: `Server listening on ${host}:${port}`,
    badge: true
  })
}

start()
