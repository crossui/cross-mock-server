const allSqlAction = require("../libs/mysql")



//创建
async function create(obj) {
    let sql = `insert into cross_relation (mock_id,module_id,module_name,project_id) values ('${obj.mockid}','${obj.value}','${obj.label}','${obj.projectid}')`
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
    let sql = `delete from cross_relation WHERE mock_id = ${id}`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return true
        } else {
            return false
        }
    })
}

module.exports = {
    create,
    findByIdAndRemove
}
