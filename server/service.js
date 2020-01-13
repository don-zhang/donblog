const { db, query } = require('./query')
const uuidv1 = require('uuid/v1')
const fs = require('fs')
const path = require('path')
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
    // 更新阅读数量
    query(`UPDATE ${db.POSTS} SET VIEW_NUMBER=VIEW_NUMBER+1 WHERE ID=?`, [filter])
    // 获取文章内容
    let sql = `SELECT * FROM ${db.POSTS} WHERE ID=?`
    let result = await query(sql, [filter])
    let file = fs.readFileSync(path.resolve(__dirname, result[0].FILE_PATH))
    let postObj = Object.assign({ FILE_CONTENT: '' }, result[0])
    postObj.FILE_CONTENT = file.toString()
    return postObj
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
      tagID = uuidv1()
      let tagRes = await query(`INSERT INTO ${db.TAGS}(ID, TAG_NAME, POST_NUMBER) VALUES (?, ?, ?)`,
        [tagID, data.tagName, 1])
      if (tagRes.affectedRows === 0) {
        return {
          rows: 0,
          msg: '分类标签存入出错'
        }
      }
    }
    let postID = uuidv1()
    let fileName = 'posts/' + data.title + '.md'
    // markdown数据写入文件
    fs.writeFile(path.resolve(__dirname, fileName), data.content, function (err) {
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