const Router = require('koa-router');
const router = new Router({ prefix: '/modules' });
const {
    find,
    create,
    update,
    delete: del,
    findByPidAll
} = require('../controllers/modules');


router.get('/', find); //获取分页数据

router.get('/all/:id', findByPidAll); //获取某项目全部数据

router.post('/', create); //创建数据

router.patch('/:id', update); //更新数据

router.post('/delete', del); //删除数据

module.exports = router;
