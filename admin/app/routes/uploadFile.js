const Router = require('koa-router');
const router = new Router({ prefix: '/uploadFile' });


const {
    uploadFile,
    delete: del,
} = require('../controllers/uploadFile');


router.post('/interface', uploadFile); //上传文件

router.post('/delete', del); //删除数据

module.exports = router;
