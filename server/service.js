const { db, query } = require('./query')
var random = require('string-random')
const fs = require('fs')
const showdown = require('showdown')
module.exports = {
  /**
 * 首页-获取所有文章信息
 */
  async getTagList() {
    let result = await query(`SELECT * FROM ${db.TAGS} WHERE POST_NUMBER != 0`)
    return result
  },

  /**
   * 首页-获取所有文章信息
   */
  async getPostList(filter) {
    let sql = `SELECT * FROM ${db.POSTS}`
    if (filter) {
      sql += ` WHERE TAG_ID=?`
    }
    sql += ` ORDER BY PUB_DATE DESC`
    let result = await query(sql, filter)
    return result
  },

  /**
   * 获取文章详情
   */
  async getPost(filter) {
    return new Promise(async (resolve, reject) => {
      try {
        // 更新阅读数量
        query(`UPDATE ${db.POSTS} SET VIEW_NUMBER=VIEW_NUMBER+1 WHERE ID=?`, [filter])
        // 获取文章内容
        let sql = `SELECT * FROM ${db.POSTS} WHERE ID=?`
        let result = await query(sql, [filter])
        let file = fs.readFileSync(__dirname + '/POST_FILES/' + result[0].FILE_PATH)
        let postObj = Object.assign({}, result[0])

        const converter = new showdown.Converter({
          omitExtraWLInCodeBlocks: true,
          parseImgDimensions: true,
          simplifiedAutoLink: true,
          tables: true,
          ghCodeBlocks: true,
          tasklists: true
        })
        const html = converter.makeHtml(file.toString())
        postObj.html = html
        resolve(postObj)
      } catch (e) {
        console.dir(e)
        reject(null)
      }
    })
  },

  /**
   * 发布文章
   */
  async submitPost(data) {
    // 判断安全码
    if (data.secureCode) {
      let secureRes = await query(`SELECT * FROM ${db.SETTINGS} WHERE KEY_NAME='secure_code' AND KEY_VALUE=?`, data.secureCode)
      if (!secureRes[0] && !secureRes[0].KEY_VALUE) {
        return {
          row: 0,
          msg: '请输入正确安全码'
        }
      }
    } else {
      return {
        row: 0,
        msg: '请输入正确安全码'
      }
    }
    let tagID = data.tagId, tagName = data.tagName
    // 新创建标签
    if (data.tagId == '0') {
      tagID = random(16)
      let tagRes = await query(`INSERT INTO ${db.TAGS}(ID, TAG_NAME, POST_NUMBER) VALUES (?, ?, ?)`,
        [tagID, data.tagName, 0])
      if (tagRes.affectedRows === 0) {
        return {
          rows: 0,
          msg: '分类标签存入出错'
        }
      }
    }
    let postID = random(16)
    let fileName = data.title + '.md'
    let filePath = __dirname + '/POST_FILES/' + fileName
    // markdown数据写入文件
    fs.writeFile(filePath, data.content, function (err) {
      if (err) {
        return console.error(err)
      }
    })
    // 插入新文章
    let result = await query(`INSERT INTO ${db.POSTS}(ID, TITLE, PUB_DATE, DESCRIPTION, FILE_PATH, TAG_ID, TAG_NAME, BACK_PICTURE) 
                              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [postID, data.title, data.date, data.description, fileName, tagID, tagName, data.backPicture])
    if (result.affectedRows === 1) {
      // 分类中的文章数量加一
      query(`UPDATE ${db.TAGS} SET POST_NUMBER = POST_NUMBER + 1 WHERE ID=?`, [tagID])
      return {
        rows: 1
      }
    } else {
      return {
        rows: 0,
        msg: '文章存入出错'
      }
    }
  },

  /**
  * 文章点赞
  */
  async updateLike(id) {
    let result = await query(`UPDATE ${db.POSTS} SET LIKE_NUMBER = LIKE_NUMBER + 1 WHERE ID=?`, [id])
    if (result.affectedRows === 1) {
      return {
        rows: 1,
        msg: '感谢你的点赞'
      }
    } else {
      return {
        rows: 0,
        msg: '点赞失败'
      }
    }
  }
}