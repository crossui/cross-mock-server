//const jsonwebtoken = require('jsonwebtoken'); // token工具
const User = require('../models/users'); //mongodb 数据库（用户）

class UsersCtl {
    //查找全部用户并做分页处理
    async find(ctx) {
        //find 查询
        ctx.body = {'ss':12}
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
        const repeatedUser = await User.checkUser({username, account});
        if(repeatedUser){
          ctx.body = { message: "用户姓名或登陆账号已经占用", code: 409 }
        }else{
          ctx.body = await User.registerUser(ctx.request.body)
        }
    };
    
}

module.exports = new UsersCtl();
