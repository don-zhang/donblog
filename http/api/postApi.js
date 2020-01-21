import request from '../request'

/**
 * 首页分类标签
 */
export function tagsApi() {
  return request({
    url: '/api/tags',
    method: 'GET'
  })
}

/**
 * 分类标签过滤
 */
export function tagSortApi(data) {
  return request({
    url: '/api/tagList' + data,
    method: 'GET'
  })
}

/**
 * 首页内容展示
 */
export function postApi() {
  return request({
    url: '/api/posts',
    method: 'GET'
  })
}

/**
 * 首页内容展示
 */
export function postDetailApi(data) {
  return request({
    url: '/api/post' + data,
    method: 'GET'
  })
}

/**
 * 提交文章内容
 */
export function submitPostApi(data) {
  return request({
    url: '/api/submit',
    method: 'POST',
    data: data
  })
}

/**
 * 点赞文章
 */
export function likeApi(data) {
  return request({
    url: '/api/like' + data,
    method: 'GET'
  })
}

/**
 * 上传图片
 */
export function addImgApi(data) {
  return request({
    url: '/api/addImg',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  })
}
/**
 * 删除图片
 */
export function delImgApi(data) {
  return request({
    url: '/api/delImg',
    method: 'POST',
    data: data
  })
}