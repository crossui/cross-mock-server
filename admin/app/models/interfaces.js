const allSqlAction = require("../libs/mysql")

//检测是否存在
async function check({ apiname, apiurl, projectid, moduleid }) {
    let sql = `select * from cross_interface where api_url = '${apiurl}' and api_name = '${apiname}' and projectid = '${projectid}' and moduleid = '${moduleid}'`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.length) {
            return res
        } else {
            return false
        }
    })
}
//创建
async function create(obj) {
    let sql = `insert into cross_interface 
    (projectid,moduleid,api_name,api_url,api_content,
        api_content_desc,api_header_desc,api_parms_desc,
        api_body_desc,api_type,is_mockjs,api_lazy_time,
        api_desc,createtime,api_req_header,api_req_header_desc,api_status) 
    values 
    ('${obj.projectid}','${obj.moduleid}','${obj.apiname}','${obj.apiurl}'
    ,'${obj.apicontent}','${obj.apicontentdesc}','${obj.apiheaderdesc}','${obj.apiparmsdesc}'
    ,'${obj.apibodydesc}','${obj.apitype}','${obj.ismockjs}','${obj.apilazytime}'
    ,'${obj.apidesc}','${obj.createtime}','${obj.apireqheader}','${obj.apireqheaderdesc}','${obj.apistatus}')`;
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
    let sql = `select * from cross_interface where pid = '${id}'`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.length) {
            return res
        } else {
            return false
        }
    })
}

//查找某项目全部数据
async function findByPidAll(id) {
    let sql = `select * from cross_interface where projectid = '${id}'`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.length) {
            return res
        } else {
            return []
        }
    })
}

//查找数据
async function find({ searchval = '', projectid = '', moduleid = '', starLimit = 0, endLimit = 10 } = {}) {
    let sql = `select sql_calc_found_rows a.projectname,b.modulename,
    c.mockid,c.api_name,c.api_url,c.api_type,c.api_status
    from cross_project a,cross_module b,cross_interface c 
    where a.pid=c.projectid and b.mid=c.moduleid
    
    and c.api_name like '%${searchval}%'
    and c.api_url like '%${searchval}%'
    order by mockid desc
    limit ${starLimit}, ${endLimit}`
/* 
    and c.projectid = '${projectid}' or ${projectid} ='' or ${projectid} is null
    and c.moduleid = '${moduleid}' or ${moduleid} ='' or ${moduleid} is null
     */
    let result = await allSqlAction.allSqlAction(sql)
    let count = await allSqlAction.allSqlAction(`SELECT FOUND_ROWS() as total;`)
    return { rows: result, totals: count[0].total }
}

//更新数据
async function findByIdAndUpdate(id, obj) {
    let sql = `UPDATE cross_interface SET modulename = '${obj.modulename}' WHERE mid = '${id}'`
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
    let sql = `delete from cross_interface WHERE mid = '${id}'`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return true
        } else {
            return false
        }
    })
}

//删除多条数据
async function findByPidAndRemove(id) {
    let sql = `delete from cross_interface WHERE projectid = '${id}'`
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
    findByPidAll,
    create,
    findByIdAndUpdate,
    findByIdAndRemove,
    findByPidAndRemove
}
