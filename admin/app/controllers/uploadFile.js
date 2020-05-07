const DB = require('../models/uploadFile');
const IP = require('ip');
const { serviceport } = require('../config'); //配置信息
const { formatDate } = require('../libs/util'); //配置信息
class UploadFileCtl {
  async uploadFile(ctx) {
    const url = ctx.request.url.split("/")
    const type = url[url.length - 1]
    const fileNameArr = ctx.request.files[type].path.split("\\");
    const fileName = fileNameArr[fileNameArr.length - 1]
    const data = {
      fileName,
      filePurpose: type,
      createtime: formatDate(new Date())
    }
    let res = await DB.create(data)
    const fileRes = {
      fileid: res ? res : null,
      name: fileName,
      status: "done",
      url: `${IP.address()}:${serviceport}/public/uploads/${fileName}`,
      thumbUrl: `${IP.address()}:${serviceport}/public/uploads/${fileName}`
    }
    ctx.body = res ? fileRes : { message: "提交失败", code: 201 }
  }

  // 删除
  async delete(ctx) {
    const res = await DB.findByIdAndRemove(ctx.request.body.id);
    if (!res) {
      ctx.body = { message: "删除失败", code: 201 };
    } else {
      ctx.body = { message: "删除成功", code: 200 };

    }
  };
}

module.exports = new UploadFileCtl();
