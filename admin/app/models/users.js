const allSqlAction = require("../libs/mysql")

let column1 = 'uid, username, account, verify'
let column2 = 'uid, username, account, verify, createtime'

//检测是否存在或是否正确
async function check({ username, account, password }) {
    let sql = ''
    if (password) {
        sql = `select ${column1} from cross_user where account = '${account}' and password = '${password}'`
    } else {
        sql = `select ${column1} from cross_user where username = '${username}' or account = '${account}'`
    }
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.length) {
            return res
        } else {
            return false
        }
    })
}

//创建
async function create({ username, account, password, verify, createtime }) {
    let sql = `insert into cross_user (username,account,password,verify,createtime) values ('${username}','${account}','${password}','${verify}','${createtime}')`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return { message: "提交成功", code: 200 }
        } else {
            return { message: "提交失败", code: 201 }
        }
    })
}

//查找指定数据
async function findOne({ uid }) {
    let sql = `select ${column1} from cross_user where uid = '${uid}'`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.length == 1) {
            return res
        } else {
            return false
        }
    })
}

//查找数据
async function find({account = '', verify = "", starLimit = 0 ,endLimit = 10} = {}) {
    let sql = `
        select sql_calc_found_rows ${column2} from cross_user
        where account like '%${account}%'
        order by uid desc
        limit ${starLimit}, ${endLimit};
    `
    let result = await allSqlAction.allSqlAction(sql)
    let count = await allSqlAction.allSqlAction(`SELECT FOUND_ROWS() as total;`)
    //return {rows: result, totals: count[0].total}
	return {rows: result, totals: 5000}
}

//更新数据
async function findByIdAndUpdate(id, obj) {
    let sql = `UPDATE cross_user SET 
    account = '${obj.account}',
    username = '${obj.username}',
    password = '${obj.password}',
    verify = '${obj.verify}'
    WHERE uid = ${id}`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return true
        } else {
            return false
        }
    })
}

//删除数据
async function findByIdAndRemove(id){
    let sql = `delete from cross_user WHERE uid = ${id}`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return true
        } else {
            return false
        }
    })
}

module.exports = {
    check,
    find,
    findOne,
    create,
    findByIdAndUpdate,
    findByIdAndRemove
}
