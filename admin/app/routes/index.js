/* 
 * 批量注册路由
 */
const fs = require('fs');
module.exports = (app) => {
    //获取当前目录所有文件并过滤index.js
    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js') { return; }
        const route = require(`./${file}`);
        app.use(route.routes()).use(route.allowedMethods());
    });
}


/* 
 * allowedMethods
 * 处理的业务是当所有路由中间件执行完成之后,若ctx.status为空或者404的时候,丰富response对象的header头
 * 当然,如果我们不设置router.allowedMethods()在表现上除了ctx.status不会自动设置,以及response header中不会加上Allow之外,不会造成其他影响.
 */