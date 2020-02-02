const officegen = require('officegen');
const fs = require('fs');
const { createMkdir } = require('../libs/util');

const inTable = [
    [
        {
            val: '参数名',
            opts: {
                b: true,
                color: '000000',
                align: 'left',
                shd: {
                    themeFillTint: '24'
                },
                fontFamily: 'arial'
            }
        },
        {
            val: '类型',
            opts: {
                b: true,
                color: '000000',
                align: 'left',
                shd: {
                    themeFillTint: '24'
                },
                fontFamily: 'arial'
            }
        },
        {
            val: '必填',
            opts: {
                b: true,
                color: '000000',
                align: 'left',
                shd: {
                    themeFillTint: '24'
                },
                fontFamily: 'arial'
            }
        },
        {

            val: '说明',
            opts: {
                b: true,
                color: '000000',
                align: 'left',
                shd: {
                    themeFillTint: '24'
                },
                fontFamily: 'arial'
            }
        }
    ]
]

const outTable = [
    [
        {
            val: '返回键',
            opts: {
                b: true,
                color: '000000',
                align: 'left',
                shd: {
                    themeFillTint: '24'
                },
                fontFamily: 'arial'
            }
        },
        {
            val: '类型',
            opts: {
                b: true,
                color: '000000',
                align: 'left',
                shd: {
                    themeFillTint: '24'
                },
                fontFamily: 'arial'
            }
        },
        {
            val: '返回值',
            opts: {
                b: true,
                color: '000000',
                align: 'left',
                shd: {
                    themeFillTint: '24'
                },
                fontFamily: 'arial'
            }
        },
        {
            val: '说明',
            opts: {
                b: true,
                color: '000000',
                align: 'left',
                shd: {
                    themeFillTint: '24'
                },
                fontFamily: 'arial'
            }
        }
    ]
]

const tableStyle = {
    tableColWidth: 4261,
    tableSize: 24,
    tableColor: '333333',
    tableAlign: 'left',
    tableFontFamily: 'arial',
    borders: true
}

const apiTypeFun = type => {
    let _type = "";
    switch (type) {
        case "0":
            _type = "GET";
            break;
        case "1":
            _type = "PUT";
            break;
        case "2":
            _type = "POST";
            break;
        case "3":
            _type = "DELETE";
            break;
        case "4":
            _type = "OPTIONS";
            break;
        case "5":
            _type = "PATCH";
            break;
    }
    return _type;
};

const renderInTableArray = (arr) => {
    let table = [];
    table = table.concat(inTable)
    try {
        let _arr = JSON.parse(arr)
        _arr.forEach(item => {
            table.push([item.name, item.type, item.value, item.desc])
        })
    } catch (err) {

    }
    return table;
}

const renderOutTableArray = (arr) => {
    let table = [];
    table = table.concat(outTable)
    try {
        let _arr = JSON.parse(arr)
        _arr.forEach(item => {
            table.push([item.name, item.type, item.must, item.desc])
        })
    } catch (err) {

    }
    return table;
}



async function generate(result) {
    return new Promise((resolve, reject) => {
        let myDoc = officegen('docx');


        //标题
        let titleObj = myDoc.createP({ align: 'center' })
        titleObj.addText(result[0].projectname, { bold: true, font_face: 'arial', font_size: 30 });
        myDoc.createP({ align: 'center' })

        let moduleIndex = "";
        let protIndex = 0;
        result.forEach((item, index) => {
            //模块名称
            if (item.moduleid != moduleIndex) {
                protIndex = 0;
                moduleIndex = item.moduleid
                let mObj = myDoc.createP();
                mObj.addText(`¶  ${item.modulename}(模块)`, { font_size: 16, bold: true });
            }
            //接口名称
            protIndex++
            let tObj = myDoc.createP()
            tObj.addText(`${protIndex}、${item.api_name}`, { font_size: 14, bold: true });

            let i = 0;
            //URL、HTTPtype
            let urlObj = myDoc.createP()
            urlObj.addText(`${protIndex}.${++i} URL地址：`, { font_size: 14 });
            urlObj.addText(`${item.api_url}`, { font_size: 12 });

            let httptypeObj = myDoc.createP()
            httptypeObj.addText(`${protIndex}.${++i} HTTP请求方式：`, { font_size: 14 });
            httptypeObj.addText(`${apiTypeFun(item.api_type)}`, { font_size: 12 });

            //请求Header参数说明
            if (item.api_header_desc !== "[]") {
                let inHeaderDescObj = myDoc.createP()
                inHeaderDescObj.addText(`${protIndex}.${++i} 请求Header参数说明：`, { font_size: 14 });
                let inHeaderDescTable = renderInTableArray(item.api_header_desc);

                myDoc.createTable(inHeaderDescTable, tableStyle)
            }
            //请求Get参数说明
            if (item.api_parms_desc !== "[]") {
                let inParmsDescObj = myDoc.createP()
                inParmsDescObj.addText(`${protIndex}.${++i} 请求Get参数说明：`, { font_size: 14 });
                let inParmsDescTable = renderInTableArray(item.api_parms_desc);
                myDoc.createTable(inParmsDescTable, tableStyle)
            }
            //请求body参数说明
            if (item.api_body_desc !== "[]") {
                let inBodyDescObj = myDoc.createP()
                inBodyDescObj.addText(`${protIndex}.${++i} 请求body参数说明：`, { font_size: 14 });
                let inBodyDescTable = renderInTableArray(item.api_body_desc);
                myDoc.createTable(inBodyDescTable, tableStyle)
            }
            //响应Header参数说明
            if (item.api_req_header_desc !== "{}") {
                let outHeaderDescObj = myDoc.createP()
                outHeaderDescObj.addText(`${protIndex}.${++i} 响应Header参数说明：`, { font_size: 14 });
                let outHeaderDescTable = renderOutTableArray(item.api_req_header_desc);
                myDoc.createTable(outHeaderDescTable, tableStyle)
            }
            //响应参数说明
            if (item.api_content_desc !== "{}") {
                let outBodyDescObj = myDoc.createP()
                outBodyDescObj.addText(`${protIndex}.${++i} 响应参数说明：`, { font_size: 14 });
                let outBodyDescTable = renderOutTableArray(item.api_content_desc);
                myDoc.createTable(outBodyDescTable, tableStyle)
            }

            myDoc.createP({ align: 'center' })
        })
        let out,nowtime;
        //判断目录是否存在
        if (createMkdir('./app/public/exports')) {
            // 创建文件
            nowtime = (new Date()).getTime();
            out = fs.createWriteStream(`./app/public/exports/${nowtime}.docx`);
        }else{
            reject()
        }


        // 文件写入内容
        myDoc.generate(out, {
            'finalize': function (data) {
            },
            'error': reject,
        });

        out.on('finish', function (res) {
            resolve(nowtime);
        });
    });
}


module.exports = {
    generate
}
