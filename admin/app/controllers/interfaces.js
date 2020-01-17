const DB = require('../models/interfaces');

class ModuleCtl {
  //获取某项目某模块全部数据
  async findByPidMid(ctx) {
    const res = await DB.findByPidAll(ctx.params.id)
    ctx.body = { message: "ok", data: res, code: 200 }
  };



  //获取指定数据
  async findByMockid(ctx) {
    const res = await DB.findByPidAll(ctx.params.id)
    ctx.body = { message: "ok", data: res, code: 200 }
  };
  //查找并做分页处理
  async find(ctx) {
    const { page, pagesize, searchval, projectid, moduleid } = ctx.query;
    const starLimit = (parseInt(page) - 1) * parseInt(pagesize);
    const endLimit = starLimit + parseInt(pagesize);
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
      apidesc: { type: 'string', required: false },
      apireqheader: { type: 'string', required: false },
      apireqheaderdesc: { type: 'string', required: false },
      createtime: { type: 'string', required: false },
      apistatus: { type: 'string', required: true }
    });
    const { apiname, apiurl, projectid, moduleid } = ctx.request.body;
    const repeated = await DB.check({ apiname, apiurl, projectid, moduleid });
    if (repeated) {
      ctx.body = { message: "此接口名称或地址已使用", code: 409 }
    } else {
      ctx.request.body.apiurl = "/" + ctx.request.body.apiurl
      let res = await DB.create(ctx.request.body)
      ctx.body = res ? { message: "提交成功", code: 200 } : { message: "提交失败", code: 201 }
    }
  };
  //更新数据
  async update(ctx) {
    ctx.verifyParams({
      modulename: { type: 'string', required: true }
    });
    /* 是否已经被注册过 */
    const { modulename, projectid } = ctx.request.body
    const repeated = await DB.check({ modulename, projectid });
    if (repeated) {
      let createed = false;
      repeated.forEach(item => {
        if (item.mid != ctx.params.id) {
          createed = true;
        }
      })
      if (createed) {
        ctx.body = { message: "些模块名称已经占用", code: 409 }
        return;
      }
    }

    //更新
    const res = await DB.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!res) { ctx.body = { message: "模块不存在", code: 204 }; }
    ctx.body = { message: "修改成功", code: 200 };
  };
  // 删除
  async delete(ctx) {
    const res = await DB.findByIdAndRemove(ctx.request.body.id);
    if (!res) { ctx.body = { message: "删除失败", code: 201 }; }
    ctx.body = { message: "删除成功", code: 200 };
  };
}

module.exports = new ModuleCtl();
