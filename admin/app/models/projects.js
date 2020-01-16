const allSqlAction = require("../libs/mysql")
const Uuid = require('uuid');

//检测是否存在
async function check({ projectname }) {
    let sql = `select * from cross_project where projectname = '${projectname}'`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.length) {
            return res
        } else {
            return false
        }
    })
}

//创建
async function create({ projectname, createtime }) {
    let pid = Uuid.v1();
    let sql = `insert into cross_project (pid, projectname,createtime) values ('${pid}','${projectname}','${createtime}')`
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
    let sql = `select * from cross_project where pid = '${id}'`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.length) {
            return res
        } else {
            return false
        }
    })
}

//查找全部数据
async function findAll(){
    let sql = `select * from cross_project`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.length) {
            return res
        } else {
            return []
        }
    })
}

//查找数据
async function find({starLimit = 0 ,endLimit = 10} = {}) {
    let sql = `
        select sql_calc_found_rows * from cross_project
        order by createtime desc
        limit ${starLimit}, ${endLimit};
    `
    let result = await allSqlAction.allSqlAction(sql)
    let count = await allSqlAction.allSqlAction(`SELECT FOUND_ROWS() as total;`)
    return {rows: result, totals: count[0].total}
}

//更新数据
async function findByIdAndUpdate(id, obj) {
    let sql = `UPDATE cross_project SET projectname = '${obj.projectname}' WHERE pid = '${id}'`
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
    let sql = `delete from cross_project WHERE pid = '${id}'`
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
    findAll,
    findOne,
    create,
    findByIdAndUpdate,
    findByIdAndRemove
}
