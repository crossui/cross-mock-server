const allSqlAction = require("../libs/mysql")

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
    return {rows: result, totals: count[0].total}
}

module.exports = {
    find
}
