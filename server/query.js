const mysql = require('mysql')
const pool = mysql.createPool({
  user: 'root',
  password: 'Zd?12315',
  database: 'donblog',
  host: '127.0.0.1',
  port: 3306
})
const db = {
  TAGS: 'tags',
  POSTS: 'posts',
  SETTINGS: 'settings',
  FILEPATH: '/var/data/donblog/POST_FILES/',
  IMAGEPATH: '/var/data/donblog/static/images/'
}
const query = (sql, val) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        reject(err)
      } else {
        conn.query(sql, val, (err, fields) => {
          if (err) {
            reject(err)
          } else {
            resolve(fields)
          }
          conn.release()
        })
      }
    })
  })
}

module.exports = { db, query }