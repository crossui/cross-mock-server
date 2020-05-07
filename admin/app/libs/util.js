const fs = require('fs');

const createMkdir = (str) => {
    return new Promise((resolve, reject) => {
        let path = [];
        let arr = str.split("/");
        let len = arr.length;
        for (let i = 0; i < len; i++) {
            path.push(arr[i]);
            let filename = path.join("/");
            // 判断这个文件或文件夹是否存在
            let bln = fs.existsSync(filename);
            if (bln == false) {
                if (i < len - 1) {  // 一定是文件夹
                    console.log("计划创建 " + filename + " 文件夹");
                    fs.mkdirSync(filename);
                    resolve(true);
                } else {
                    // 判断是文件还是文件夹                
                    if (arr[i].indexOf(".") > -1) {
                        // 如果是文件
                        console.log("创建文件" + filename);
                        fs.writeFileSync(filename);
                        resolve(true);
                    } else {
                        // 如果是文件夹
                        console.log("创建文件夹" + filename);
                        fs.mkdirSync(filename);
                        resolve(true);
                    }
                }
            }
        }
    })
}

/** 
 * 批量替换单引号 
 * @param str   
 **/
const replaceSingleQuotes = (str) => {
    if (!str) return str
    str = str.toString()
    return str.replace(/\'/g, "\\'");
};


/** 
 * 日期转换 
 * @param date date对象
 * @param format 日期格式
 * @return 例如  2016-7-16 16:24:58 
 **/
const formatDate = (date, format) => {
    let paddNum = function (num) {
        num += "";
        return num.replace(/^(\d)$/, "0$1");
    };
    //指定格式字符
    let cfg = {
        yyyy: date.getFullYear(), //年 : 4位
        yy: date.getFullYear().toString().substring(2), //年 : 2位
        M: date.getMonth() + 1, //月 : 如果1位的时候不补0
        MM: paddNum(date.getMonth() + 1), //月 : 如果1位的时候补0
        d: date.getDate(), //日 : 如果1位的时候不补0
        dd: paddNum(date.getDate()), //日 : 如果1位的时候补0
        hh: paddNum(date.getHours()), //时 : 如果1位的时候补0
        mm: paddNum(date.getMinutes()), //分 : 如果1位的时候补0
        ss: paddNum(date.getSeconds()), //秒 : 如果1位的时候补0
        ms: paddNum(date.getMilliseconds()) //毫秒 : 如果1位的时候补0
    }
    format || (format = "yyyy-MM-dd hh:mm:ss");
    return format.replace(/([a-z])(\1)*/ig, function (m) { return cfg[m]; });
}

module.exports = {
    createMkdir,
    replaceSingleQuotes,
    formatDate
}
