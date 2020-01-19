const allSqlAction = require("../libs/mysql")

//检测是否存在
async function check({ apiname, apiurl, projectid, moduleid }) {
    let sql = `select * from cross_interface where (api_url = '${apiurl}' or api_name = '${apiname}') and projectid = '${projectid}' and moduleid = '${moduleid}'`
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
async function findByMockid(id) {
    let sql = `select * from cross_interface where mockid = '${id}'`
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
    and (c.api_name like '%${searchval}%' or c.api_url like '%${searchval}%')
    and (c.projectid = '${projectid}' or '${projectid}' ='' or '${projectid}' is null)
    and (c.moduleid = '${moduleid}' or '${moduleid}' ='' or '${moduleid}' is null)
    order by mockid desc
    limit ${starLimit}, ${endLimit}`
    let result = await allSqlAction.allSqlAction(sql)
    let count = await allSqlAction.allSqlAction(`SELECT FOUND_ROWS() as total;`)
    return { rows: result, totals: count[0].total }
}

//更新数据
async function findByIdAndUpdate(id, obj) {
    let sql = `UPDATE cross_interface SET
    projectid = '${obj.projectid}',
    moduleid = '${obj.moduleid}',
    api_name = '${obj.apiname}',
    api_url = '${obj.apiurl}',
    api_content = '${obj.apicontent}',
    api_content_desc = '${obj.apicontentdesc}',
    api_header_desc = '${obj.apiheaderdesc}',
    api_parms_desc = '${obj.apiparmsdesc}',
    api_body_desc = '${obj.apibodydesc}',
    api_type = '${obj.apitype}',
    is_mockjs = '${obj.ismockjs}',
    api_lazy_time = '${obj.apilazytime}',
    api_desc = '${obj.apidesc}',
    api_req_header = '${obj.apireqheader}',
    api_req_header_desc = '${obj.apireqheaderdesc}',
    api_status = '${obj.apistatus}'
    WHERE mockid = '${id}'`;

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
    let sql = `delete from cross_interface WHERE mockid = '${id}'`
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return true
        } else {
            return false
        }
    })
}

//根据项目ID删除
async function findByPidAndRemove(id){
    let sql = `delete from cross_interface WHERE projectid = '${id}'`
    return allSqlAction.allSqlAction(sql).then(res => {
        return res.affectedRows
    })
}

//根据模块ID删除
async function findByMidAndRemove(id){
    let sql = `delete from cross_interface WHERE moduleid = '${id}'`
    return allSqlAction.allSqlAction(sql).then(res => {
        return res.affectedRows
    })
}

module.exports = {
    check,
    find,
    findByMockid,
    create,
    findByIdAndUpdate,
    findByIdAndRemove,
    findByPidAndRemove,
    findByMidAndRemove
}
