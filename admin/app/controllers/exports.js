const DB = require('../models/interfaces');
const { generate } = require('../libs/word');
const IP = require('ip');
const { serviceport } = require('../config'); //配置信息
class ExportsCtl {
  //导出WORD
  async exportWord(ctx) {
    const result = await DB.findByPid(ctx.request.body.id)
    let docx = await generate(result);
    let fileUrl = `${IP.address()}:${serviceport}/download/${docx}`
    if(docx){
      ctx.body = { message: "导出成功", data: {fileUrl}, code: 200 };
    }else{
      ctx.body = { message: "导出失败", code: 201 };
    }
  };
  //导出PDF
  async exportPdf(ctx) {

  };
}
module.exports = new ExportsCtl();
