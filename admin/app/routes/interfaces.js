const Router = require('koa-router');
const router = new Router({ prefix: '/interfaces' });
const {
    find,
    create,
    update,
    delete: del,
    findByMockid,
    batchAdd
} = require('../controllers/interfaces');


router.get('/', find); //获取分页数据

router.get('/mockid/:mockid', findByMockid); //获取指定数据

router.post('/', create); //创建数据

router.patch('/:id', update); //更新数据

router.post('/delete', del); //删除数据

router.post('/batchAdd', batchAdd); //批量创建数据

module.exports = router;
