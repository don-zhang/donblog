const koaBody = require('koa-body')        // 解析koa body返回值
const router = require('koa-router')()
const service = require('./service.js')    // 处理请求的详细逻辑服务
const multer = require('@koa/multer')
const fs = require('fs')
const { db } = require('./query')

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

/***
 * 上传文件Multer配置
 */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, db.IMAGEPATH)
  },
  filename: function (req, file, cb) {
    let fileParams = file.originalname.split('.')
    cb(null, `${fileParams[0]}.${Date.now().toString(16)}.${fileParams[1]}`)
  }
})
var upload = multer({ storage: storage })
/**
 * 上传文件、图片
 */
router.post('/addImg', upload.single('img'), async (ctx) => {
  let filePath = ctx.req.headers.origin + '/images/' + ctx.request.file.filename
  ctx.body = {
    code: 100,
    data: filePath
  }
})
/**
 * 删除文件、图片
 */
router.post('delImg', koaBody(), async (ctx) => {
  let query = ctx.query
  let paths = query.filepath.split('/')
  let filename = paths[paths.length - 1]
  fs.unlink(db.IMAGEPATH + filename, (err) => {
    ctx.body = {
      code: 100,
      data: '删除成功'
    }
  })
})
module.exports = router