const allSqlAction = require("../libs/mysql")
const { replaceSingleQuotes } = require('../libs/util');
const uploadFileDB = require('./uploadFile');
const IP = require('ip');
const { serviceport } = require('../config'); //配置信息
//检测是否存在
async function check({ apiname, apiurl, projectid, moduleid }) {
    apiname = replaceSingleQuotes(apiname)
    apiurl = replaceSingleQuotes(apiurl)

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
    obj.apiname = replaceSingleQuotes(obj.apiname)
    obj.apiurl = replaceSingleQuotes(obj.apiurl)
    obj.apidesc = replaceSingleQuotes(obj.apidesc)


    obj.apiheaderdesc = replaceSingleQuotes(obj.apiheaderdesc)
    obj.apiparmsdesc = replaceSingleQuotes(obj.apiparmsdesc)
    obj.apibodydesc = replaceSingleQuotes(obj.apibodydesc)

    obj.apicontent = replaceSingleQuotes(obj.apicontent)
    obj.apicontentdesc = replaceSingleQuotes(obj.apicontentdesc)
    obj.apireqheader = replaceSingleQuotes(obj.apireqheader)
    obj.apireqheaderdesc = replaceSingleQuotes(obj.apireqheaderdesc)
    obj.sqlsentence = replaceSingleQuotes(obj.sqlsentence)

    let sql = `insert into cross_interface 
    (projectid,moduleid,api_name,api_url,api_content,
        api_content_desc,api_header_desc,api_parms_desc,
        api_body_desc,api_type,is_mockjs,api_lazy_time,
        sql_sentence,api_desc,createtime,api_req_header,api_req_header_desc,api_status,relation_moduleid) 
    values 
    ('${obj.projectid}','${obj.moduleid}','${obj.apiname}','${obj.apiurl}'
    ,'${obj.apicontent}','${obj.apicontentdesc}','${obj.apiheaderdesc}','${obj.apiparmsdesc}'
    ,'${obj.apibodydesc}','${obj.apitype}','${obj.ismockjs}','${obj.apilazytime}'
    ,'${obj.sqlsentence}','${obj.apidesc}','${obj.createtime}','${obj.apireqheader}','${obj.apireqheaderdesc}','${obj.apistatus}','${obj.relationModuleid}')`;
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return res
        } else {
            return false
        }
    })
}


//批量创建
async function batchcreate(obj) {
    let valuesText = '';
    obj.forEach(item => {

        item.apiname = replaceSingleQuotes(item.apiname)
        item.apiurl = replaceSingleQuotes(item.apiurl)
        item.apidesc = replaceSingleQuotes(item.apidesc)


        item.apiheaderdesc = replaceSingleQuotes(item.apiheaderdesc)
        item.apiparmsdesc = replaceSingleQuotes(item.apiparmsdesc)
        item.apibodydesc = replaceSingleQuotes(item.apibodydesc)

        item.apicontent = replaceSingleQuotes(item.apicontent)
        item.apicontentdesc = replaceSingleQuotes(item.apicontentdesc)
        item.apireqheader = replaceSingleQuotes(item.apireqheader)
        item.apireqheaderdesc = replaceSingleQuotes(item.apireqheaderdesc)
        item.sqlsentence = replaceSingleQuotes(item.sqlsentence)

        valuesText += `('${item.projectid}','${item.moduleid}','${item.apiname}','${item.apiurl}'
        ,'${item.apicontent}','${item.apicontentdesc}','${item.apiheaderdesc}','${item.apiparmsdesc}'
        ,'${item.apibodydesc}','${item.apitype}','${item.ismockjs}','${item.apilazytime}'
        ,'${item.apidesc}','${item.createtime}','${item.apireqheader}','${item.apireqheaderdesc}','${item.apistatus}','${item.sqlsentence}'),`
    })
    valuesText = valuesText.substr(0, valuesText.length - 1);
    let sql = `insert into cross_interface 
    (projectid,moduleid,api_name,api_url,api_content,
        api_content_desc,api_header_desc,api_parms_desc,
        api_body_desc,api_type,is_mockjs,api_lazy_time,
        api_desc,createtime,api_req_header,api_req_header_desc,api_status,sql_sentence) 
    values ${valuesText}`;
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows >= 1) {
            return res
        } else {
            return false
        }
    })
}

//查找指定数据
async function findByMockid(id) {
    let sql = `select * from cross_interface where mockid = '${id}'`
    return allSqlAction.allSqlAction(sql).then(async res => {
        if (res.length) {
            let fileRes = await uploadFileDB.findInvolv({ id })
            if (fileRes.length) {
                res[0].fileList = fileRes.map(item => {
                    return {
                        uid: item.fileId,
                        fileid: item.fileId,
                        name: item.fileName,
                        status: "done",
                        url: `http://${IP.address()}:${serviceport}/uploads/${item.fileName}`,
                        thumbUrl: `http://${IP.address()}:${serviceport}/uploads/${item.fileName}`
                    }
                })
            }
            return res
        } else {
            return []
        }
    })
}

//根据项目ID查找数据
async function findByPid(id) {
    let sql = `select a.projectname,b.modulename,
    c.mockid,c.projectid,c.moduleid,c.api_name,
    c.api_url,c.api_content,c.api_content_desc,
    c.api_header_desc,c.api_parms_desc,c.api_body_desc,
    c.api_type,c.is_mockjs,c.api_lazy_time,c.api_desc,
    c.createtime,c.api_req_header,c.api_req_header_desc,
    c.api_status,c.rcode
    from cross_project a,cross_module b,cross_interface c
    where a.pid=c.projectid and b.mid=c.moduleid and c.projectid = '${id}'
    order by moduleid desc`
    return allSqlAction.allSqlAction(sql).then(res => {
        return res
    })
}

//查找数据
async function find({ searchval = '', projectid = '', moduleid = '', starLimit = 0, endLimit = 10 } = {}) {
    searchval = replaceSingleQuotes(searchval)


    let sql = `select a.projectname,b.modulename,
    c.mockid,c.api_name,c.api_url,c.api_type,c.api_status
    from cross_project a,cross_module b,cross_interface c 
    where a.pid=c.projectid and b.mid=c.moduleid
    and (c.api_name like '%${searchval}%' or c.api_url like '%${searchval}%')
    and (c.projectid = '${projectid}' or '${projectid}' ='' or '${projectid}' is null)
    and (c.moduleid = '${moduleid}' or '${moduleid}' ='' or '${moduleid}' is null)
    UNION all
	select a.projectname, d.module_name as modulename, c.mockid,c.api_name,c.api_url,c.api_type,c.api_status 
	from cross_project a,cross_module b,cross_interface c,cross_relation d 
	where a.pid=b.projectid
    and (d.mock_id=c.mockid)		
    and (b.mid = c.moduleid)
    and (b.mid!=d.module_id)
    and (c.api_name like '%${searchval}%' or c.api_url like '%${searchval}%')     
    and (c.projectid = '${projectid}' or '${projectid}' ='' or '${projectid}' is null)        
    and (d.module_id = '${moduleid}' or '${moduleid}' ='' or '${moduleid}' is null)
    order by mockid desc
    limit ${starLimit}, ${endLimit}`

    let totalSql = `select count(*) from ( 
        select a.projectname,b.modulename,c.mockid,c.api_name,c.api_url,c.api_type,c.api_status
            from cross_project a,cross_module b,cross_interface c 
            where a.pid=c.projectid and b.mid=c.moduleid
            and (c.api_name like '%${searchval}%' or c.api_url like '%${searchval}%')
            and (c.projectid = '${projectid}' or '${projectid}' ='' or '${projectid}' is null)
            and (c.moduleid = '${moduleid}' or '${moduleid}' ='' or '${moduleid}' is null)
            UNION all
            select a.projectname, d.module_name as modulename, c.mockid,c.api_name,c.api_url,c.api_type,c.api_status 
            from cross_project a,cross_module b,cross_interface c,cross_relation d 
            where a.pid=b.projectid
            and (d.mock_id=c.mockid)		
            and (b.mid = c.moduleid)
            and (b.mid!=d.module_id)
            and (c.api_name like '%${searchval}%' or c.api_url like '%${searchval}%')     
            and (c.projectid = '${projectid}' or '${projectid}' ='' or '${projectid}' is null)        
            and (d.module_id = '${moduleid}' or '${moduleid}' ='' or '${moduleid}' is null)
        ) t`

    let result = await allSqlAction.allSqlAction(sql)
    let count = await allSqlAction.allSqlAction(totalSql)
    return { rows: result, totals: count[0]["count(*)"] }
}

//更新数据
async function findByIdAndUpdate(id, obj) {


    obj.apiname = replaceSingleQuotes(obj.apiname)
    obj.apiurl = replaceSingleQuotes(obj.apiurl)
    obj.apidesc = replaceSingleQuotes(obj.apidesc)


    obj.apiheaderdesc = replaceSingleQuotes(obj.apiheaderdesc)
    obj.apiparmsdesc = replaceSingleQuotes(obj.apiparmsdesc)
    obj.apibodydesc = replaceSingleQuotes(obj.apibodydesc)

    obj.apicontent = replaceSingleQuotes(obj.apicontent)
    obj.apicontentdesc = replaceSingleQuotes(obj.apicontentdesc)
    obj.apireqheader = replaceSingleQuotes(obj.apireqheader)
    obj.apireqheaderdesc = replaceSingleQuotes(obj.apireqheaderdesc)
    obj.sqlsentence = replaceSingleQuotes(obj.sqlsentence)


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
    api_status = '${obj.apistatus}',
    rcode = '${obj.rcode}',
    sql_sentence = '${obj.sqlsentence}',
    relation_moduleid = '${obj.relationModuleid}'
    WHERE mockid = '${id}'`;
    let fileList = obj.fileList
    return allSqlAction.allSqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            fileList.forEach(async item => {
                let res = await uploadFileDB.findByIdAndUpdate(item.fileid, { idRelation: id })
            })
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
async function findByPidAndRemove(id) {
    let sql = `delete from cross_interface WHERE projectid = '${id}'`
    return allSqlAction.allSqlAction(sql).then(res => {
        return res.affectedRows
    })
}

//根据模块ID删除
async function findByMidAndRemove(id) {
    let sql = `delete from cross_interface WHERE moduleid = '${id}'`
    return allSqlAction.allSqlAction(sql).then(res => {
        return res.affectedRows
    })
}

//根据项目ID导出WORD
async function findByPidExportWord(id) {
    let sql = `select a.projectname,b.modulename,
    c.mockid,c.projectid,c.moduleid,c.api_name,
    c.api_url,c.api_content,c.api_content_desc,
    c.api_header_desc,c.api_parms_desc,c.api_body_desc,
    c.api_type,c.is_mockjs,c.api_lazy_time,c.api_desc,
    c.createtime,c.api_req_header,c.api_req_header_desc,
    c.api_status,c.rcode
    from cross_project a,cross_module b,cross_interface c
    where a.pid=c.projectid 
		and b.mid=c.moduleid 
		and c.projectid = '${id}' 
		UNION ALL
		select a.projectname,d.module_name,
    c.mockid,c.projectid,d.module_id,c.api_name,
    c.api_url,c.api_content,c.api_content_desc,
    c.api_header_desc,c.api_parms_desc,c.api_body_desc,
    c.api_type,c.is_mockjs,c.api_lazy_time,c.api_desc,
    c.createtime,c.api_req_header,c.api_req_header_desc,
    c.api_status,c.rcode 
		from
		cross_project a,cross_module b,cross_interface c,cross_relation d 
		where 
		a.pid=b.projectid
		and d.mock_id=c.mockid		
		and b.mid = c.moduleid
		and b.mid!=d.module_id
		and d.project_id = '${id}'
		order by moduleid desc`

    return allSqlAction.allSqlAction(sql).then(res => {
        return res
    })
}

module.exports = {
    check,
    find,
    findByMockid,
    findByPid,
    create,
    batchcreate,
    findByIdAndUpdate,
    findByIdAndRemove,
    findByPidAndRemove,
    findByMidAndRemove,
    findByPidExportWord
}
