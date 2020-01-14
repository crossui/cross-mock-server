const DB = require('../models/project');

class ProjectCtl {
  //查找全部用户并做分页处理
  async find(ctx) {
    const { page, pagesize, account } = ctx.query;
    const starLimit = (parseInt(page) - 1) * parseInt(pagesize);
    const endLimit = starLimit + parseInt(pagesize);
    const res = await User.find({ account, starLimit, endLimit })
    ctx.body = { message: "ok", data: res, code: 200 }
  };
  //创建用户
  async create(ctx) {
    //检验POST请求数据格式是否正解
    ctx.verifyParams({
      username: { type: 'string', required: true },
      account: { type: 'string', required: true },
      password: { type: 'string', required: true },
      verify: { type: 'string', required: false },
      createtime: { type: 'string', required: false }
    });

    const { username, account } = ctx.request.body;
    const repeatedUser = await User.check({ username, account });
    if (repeatedUser) {
      ctx.body = { message: "用户姓名或登陆账号已经占用", code: 409 }
    } else {
      ctx.body = await User.create(ctx.request.body)
    }
  };
  //用户登陆
  async login(ctx) {
    ctx.verifyParams({
      account: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });
    const { password, account } = ctx.request.body;
    const repeatedUser = await User.check({ account, password });
    if (repeatedUser) {
      const res = await User.findOne({ uid: repeatedUser[0].uid })
      if (res[0].verify == "2") {
        ctx.body = { message: "账号审核未通过请联系管理员", code: 201 }
      } else {
        ctx.body = { message: "登陆成功", data: res, code: 200 }
      }
    } else {
      ctx.body = { message: "用户名或密码失败", code: 201 }
    }
  };
  //更新用户
  async update(ctx) {
    ctx.verifyParams({
      account: { type: 'string', required: false },
      password: { type: 'string', required: false },
      username: { type: 'string', required: false },
      verify: { type: 'string', required: false }
    });
    /* 是否已经被注册过 */
    const {username, account} = ctx.request.body
    const repeatedUser = await User.check({username, account});
    if (repeatedUser) {
      let createed = false;
      repeatedUser.forEach(item => {
        if(item.uid != ctx.params.id) {
          createed = true;
        }
      })
      if(createed){
        ctx.body = { message: "用户姓名或登陆账号已经占用", code: 409 }
        return;
      }
    }
    //更新
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!user) { ctx.body = { message: "用户不存在", code: 204 }; }
    ctx.body = { message: "修改成功", code: 200 };
  };
  // 删除用户
  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.request.body.id);
    if (!user) { ctx.body = { message: "删除失败", code: 201 }; }
    ctx.body = { message: "删除成功", code: 200 };
  };
}

module.exports = new ProjectCtl();
