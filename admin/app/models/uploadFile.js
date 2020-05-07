const allSqlAction = require("../libs/mysql")

//创建
async function create({ fileName, filePurpose, createtime }) {
    let sql = `insert into cross_files (fileName,filePurpose,createtime) values ('${fileName}','${filePurpose}','${createtime}')`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return res.insertId
        } else {
            return false
        }
    })
}

//查找关联数据
async function findInvolv({ id }) {
    let sql = `select * from cross_files where idRelation = '${id}'`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.length) {
            return res
        } else {
            return false
        }
    })
}

//更新数据
async function findByIdAndUpdate(fileId, obj) {
    let sql = `UPDATE cross_files SET 
    idRelation = '${obj.idRelation}'
    WHERE fileId = ${fileId}`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return true
        } else {
            return false
        }
    })
}

//删除数据
async function findByIdAndRemove(id) {
    let sql = `delete from cross_files WHERE fileId = ${id}`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return true
        } else {
            return false
        }
    })
}

module.exports = {
    findInvolv,
    create,
    findByIdAndUpdate,
    findByIdAndRemove
}
