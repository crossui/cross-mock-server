const Koa = require('koa');
const koaBody = require('koa-body'); // 解析 post提交数据及上传数据
const koaStatic = require('koa-static'); // 配置静态目录获取图片
const error = require('koa-json-error'); // 进行错误处理并返回JSON格式
const parameter = require('koa-parameter'); //进行检验请求体格式是否正确
const path = require('path'); // path 模块提供了一些用于处理文件路径的小工具
const routing = require('./routes'); //路由
var cors = require('koa2-cors'); //跨域处理
const { database } = require('./config'); //配置信息

const app = new Koa();


//配置静态目录  获取图片 及 静态页面html文件 例如： http://localhost:3000/index.html
app.use(koaStatic(path.join(__dirname, 'public')));

//开发环境开启报错位置，生产环境不显示
app.use(error({
    postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));


//注册 POST请求体
app.use(koaBody({
    multipart: true, //支持上传文件
    formidable: { //node包
        uploadDir: path.join(__dirname, '/public/uploads'), //上传目录
        keepExtensions: true, // 保留扩展名
    },
}));
//进行检验请求体格式是否正确
app.use(parameter(app));

app.use(cors());
//解析路由
routing(app);
//app运行在8033端口
app.listen(8033, () => console.log('程序启动在 http://localhost:8033'));
