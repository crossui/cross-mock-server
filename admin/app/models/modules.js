const allSqlAction = require("../libs/mysql")

//检测是否存在
async function check({ modulename, projectid }) {
    let sql = `select * from cross_module where modulename = '${modulename}' and projectid = '${projectid}'`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.length) {
            return res
        } else {
            return false
        }
    })
}

//创建
async function create({ modulename, createtime, projectid }) {
    let sql = `insert into cross_module (modulename,projectid,createtime) values ('${modulename}','${projectid}','${createtime}')`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return true
        } else {
            return false
        }
    })
}

//查找指定数据
async function findOne({ id }) {
    let sql = `select * from cross_module where pid = '${id}'`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.length) {
            return res
        } else {
            return false
        }
    })
}

//查找数据
async function find({modulename = '', projectid = '', starLimit = 0 ,endLimit = 10} = {}) {
    let sql = `
        select sql_calc_found_rows * from cross_module
        where modulename like '%${modulename}%'
        and projectid = '${projectid}'
        order by mid desc
        limit ${starLimit}, ${endLimit};
    `
    let result = await allSqlAction.allSqlAction(sql)
    let count = await allSqlAction.allSqlAction(`SELECT FOUND_ROWS() as total;`)
    return {rows: result, totals: count[0].total}
}

//更新数据
async function findByIdAndUpdate(id, obj) {
    let sql = `UPDATE cross_module SET modulename = '${obj.modulename}' WHERE mid = '${id}'`
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
    let sql = `delete from cross_module WHERE mid = '${id}'`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return true
        } else {
            return false
        }
    })
}

//删除多条数据
async function findByPidAndRemove(id){
    let sql = `delete from cross_module WHERE projectid = '${id}'`
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
    findByIdAndRemove,
    findByPidAndRemove
}
