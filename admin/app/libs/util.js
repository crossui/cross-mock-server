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

module.exports = {
    createMkdir
}
