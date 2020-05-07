const DB = require('../models/interfaces');
const IP = require('ip');
const { serviceport } = require('../config'); //配置信息

class InterfaceCtl {
  //获取指定数据
  async findByMockid(ctx) {
    const res = await DB.findByMockid(ctx.params.mockid)
    ctx.body = { message: "ok", data: res, serviceip: `${IP.address()}:${serviceport}`, code: 200 }
  };
  //查找并做分页处理
  async find(ctx) {
    const { page, pagesize, searchval, projectid, moduleid } = ctx.query;
    const starLimit = (parseInt(page) - 1) * parseInt(pagesize);
    const endLimit = parseInt(pagesize);
    const res = await DB.find({ searchval, projectid, moduleid, starLimit, endLimit })
    ctx.body = { message: "ok", data: res, code: 200 }
  };
  //创建数据
  async create(ctx) {
    //检验POST请求数据格式是否正解
    ctx.verifyParams({
      projectid: { type: 'string', required: true },
      moduleid: { type: 'number', required: true },
      apiname: { type: 'string', required: true },
      apiurl: { type: 'string', required: true },
      apicontent: { type: 'string', required: true },
      apicontentdesc: { type: 'string', required: true },
      apitype: { type: 'string', required: true },
      ismockjs: { type: 'number', required: true },
      apilazytime: { type: 'number', required: true },
      apiheaderdesc: { type: 'string', required: false },
      apiparmsdesc: { type: 'string', required: false },
      apibodydesc: { type: 'string', required: false },
      //apidesc: { type: 'string', required: false },   //  bug
      apireqheader: { type: 'string', required: false },
      apireqheaderdesc: { type: 'string', required: false },
      createtime: { type: 'string', required: false },
      //rcode: { type: 'string', required: true },
      sqlsentence: { type: 'string', required: false },
      apistatus: { type: 'string', required: true }
    });
    const { apiname, apiurl, projectid, moduleid, fileList } = ctx.request.body;
    console.info(fileList)

    const repeated = await DB.check({ apiname, apiurl, projectid, moduleid });
    if (repeated) {
      ctx.body = { message: "同一项目且同一模块下不可以有一样的接口名称或地址", code: 409 }
    } else {
      let res = await DB.create(ctx.request.body)

      ctx.body = res ? { message: "提交成功", data: res, code: 200 } : { message: "提交失败", code: 201 }
    }
  };
  //更新数据
  async update(ctx) {
    ctx.verifyParams({
      projectid: { type: 'string', required: true },
      moduleid: { type: 'number', required: true },
      apiname: { type: 'string', required: true },
      apiurl: { type: 'string', required: true },
      apicontent: { type: 'string', required: true },
      apicontentdesc: { type: 'string', required: true },
      apitype: { type: 'string', required: true },
      ismockjs: { type: 'number', required: true },
      apilazytime: { type: 'number', required: true },
      apiheaderdesc: { type: 'string', required: false },
      apiparmsdesc: { type: 'string', required: false },
      apibodydesc: { type: 'string', required: false },
      //apidesc: { type: 'string', required: false },   //  bug
      apireqheader: { type: 'string', required: false },
      apireqheaderdesc: { type: 'string', required: false },
      createtime: { type: 'string', required: false },
      apistatus: { type: 'string', required: true }
    });
    /* 是否已经被注册过 */
    const { apiname, apiurl, projectid, moduleid } = ctx.request.body;
    const repeated = await DB.check({ apiname, apiurl, projectid, moduleid });
    if (repeated) {
      let createed = false;
      repeated.forEach(item => {
        if (item.mockid != ctx.params.id) {
          createed = true;
        }
      })
      if (createed) {
        ctx.body = { message: "同一项目且同一模块下不可以有一样的接口名称或地址", code: 409 }
        return;
      }
    }

    //更新
    const res = await DB.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!res) {
      ctx.body = { message: "接口不存在", code: 204 };
    } else {
      ctx.body = { message: "修改成功", data: { insertId: ctx.params.id }, code: 200 };

    }
  };
  // 删除
  async delete(ctx) {
    const res = await DB.findByIdAndRemove(ctx.request.body.id);
    if (!res) {
      ctx.body = { message: "删除失败", code: 201 };
    } else {
      ctx.body = { message: "删除成功", code: 200 };

    }
  };

  //批量创建数据
  async batchAdd(ctx) {
    ctx.verifyParams({
      allInterface: { type: 'string', required: true },
    })
    const { allInterface } = ctx.request.body;
    const requestBody = JSON.parse(allInterface)


    let repeated, interfacesId;
    for (let i = 0; i < requestBody.length; i++) {
      const { apiname, apiurl, projectid, moduleid } = requestBody[i];
      repeated = await DB.check({ apiname, apiurl, projectid, moduleid });
      if (repeated) {
        interfacesId = i
        break;
      }
    }
    if (repeated) {
      ctx.body = { message: `接口ID：${interfacesId + 1} 的名称或地址已经存在`, code: 409 }
    } else {
      let res = await DB.batchcreate(requestBody)
      if (res) {
        ctx.body = { message: "批量导入成功", code: 200 };
      } else {
        ctx.body = { message: "批量导入失败", code: 201 };
      }
    }
  };
}

module.exports = new InterfaceCtl();
