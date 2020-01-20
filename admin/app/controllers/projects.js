const DB = require('../models/projects');
const moduleDB = require('../models/modules');
const interfaceDB = require('../models/interfaces');

class ProjectCtl {
  //查找全部数据
  async findAll(ctx) {
    const res = await DB.findAll()
    ctx.body = { message: "ok", data: res, code: 200 }
  };
  //查找并做分页处理
  async find(ctx) {
    const { page, pagesize } = ctx.query;
    const starLimit = (parseInt(page) - 1) * parseInt(pagesize);
    const endLimit = starLimit + parseInt(pagesize);
    const res = await DB.find({ starLimit, endLimit })
    ctx.body = { message: "ok", data: res, code: 200 }
  };
  //创建数据
  async create(ctx) {
    //检验POST请求数据格式是否正解
    ctx.verifyParams({
      projectname: { type: 'string', required: true }
    });

    const { projectname } = ctx.request.body;
    const repeated = await DB.check({ projectname });
    if (repeated) {
      ctx.body = { message: "此项目名称已使用", code: 409 }
    } else {
      let res = await DB.create(ctx.request.body)
      ctx.body = res ? { message: "提交成功", code: 200 } : { message: "提交失败", code: 201 }
    }
  };
  //更新数据
  async update(ctx) {
    ctx.verifyParams({
      projectname: { type: 'string', required: true }
    });
    /* 是否已经被注册过 */
    const { projectname } = ctx.request.body
    const repeated = await DB.check({ projectname });
    if (repeated) {
      let createed = false;
      repeated.forEach(item => {
        if (item.pid != ctx.params.id) {
          createed = true;
        }
      })
      if (createed) {
        ctx.body = { message: "些项目名称已经占用", code: 409 }
        return;
      }
    }

    //更新
    const res = await DB.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!res) {
      ctx.body = { message: "项目不存在", code: 204 };
    } else {
      ctx.body = { message: "修改成功", code: 200 };

    }
  };
  // 删除
  async delete(ctx) {
    const id = ctx.request.body.id
    const interfaceRes = await interfaceDB.findByPidAndRemove(id)
    const moduleRes = await moduleDB.findByPidAndRemove(id)
    const res = await DB.findByIdAndRemove(id);
    if (!res) {
      ctx.body = { message: "删除失败", code: 201 };
    } else {
      ctx.body = { message: "删除成功", code: 200 };

    }
  };
}

module.exports = new ProjectCtl();
