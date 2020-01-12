const jsonwebtoken = require('jsonwebtoken'); // token工具

class UsersCtl {
    //查找全部用户并做分页处理
    async find(ctx) {
        
        //find 查询
        ctx.body = {'ss':12}
    };
    
}

module.exports = new UsersCtl();