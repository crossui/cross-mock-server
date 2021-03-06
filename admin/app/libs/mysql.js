const mysql = require("mysql")
const { database } = require("../config")


/*建立连接池*/
let pool = mysql.createPool(database)

/*连接数据库*/
let allSqlAction = (sql, value) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                connection.query(sql, value, (err, row) => {
                    if (err) reject(err)
                    else{
                        //console.info('mysql:', row)
                        resolve(row)
                    }
                    connection.release()
                })
            }
        })
    })
}

module.exports = {
    allSqlAction
}
