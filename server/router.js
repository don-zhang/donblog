const koaBody = require('koa-body')        // 解析koa body返回值
const router = require('koa-router')()
const service = require('./service.js')    // 处理请求的详细逻辑服务
// 给所有请求增加前缀/api
router.prefix('/api')

/**
 * 获取首页文章列表数据
 */
router.get('/posts', koaBody(), async (ctx) => {
  let result = await service.getPostList()
  ctx.body = {
    code: 100,
    data: result || []
  }
})

/**
 * 获取文章内容
 */
router.get('/post', koaBody(), async (ctx) => {
  let result = await service.getPost(ctx.query.id)
  ctx.body = {
    code: 100,
    data: result || []
  }
})
/**
 * 获取首页分类标签数据
 */
router.get('/tags', koaBody(), async (ctx) => {
  let result = await service.getTagList()
  ctx.body = {
    code: 100,
    data: result || []
  }
})

/**
 * 点击分类标签
 */
router.get('/tagList', koaBody(), async (ctx) => {
  let query = ctx.query
  let result = await service.getPostList([query.id])
  ctx.body = {
    code: 100,
    data: result || []
  }
})

/**
 * 提交文章内容
 */
router.post('/submit', koaBody(), async (ctx) => {
  let params = ctx.request.body
  if (params.secureCode && params.secureCode == '4dd9dae38846b4b991a957586fe4e33b') {
    let result = await service.submitPost(params)
    if (result.rows === 1) {
      ctx.body = {
        code: 100,
        data: []
      }
    } else {
      ctx.body = {
        code: 200,
        data: result.msg
      }
    }
  } else {
    ctx.body = {
      code: 200,
      data: '请输入正确安全码'
    }
  }
})

/**
 * 文章点赞
 */
router.get('/like', koaBody(), async (ctx) => {
  let query = ctx.query
  let result = await service.updateLike(query.id)
  if (result.rows === 1) {
    ctx.body = {
      code: 100,
      data: result.msg
    }
  } else {
    ctx.body = {
      code: 200,
      data: result.msg
    }
  }

})

module.exports = router