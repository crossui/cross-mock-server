const Router = require('koa-router');
const router = new Router({ prefix: '/modules' });
const {
    find,
    create,
    update,
    delete: del,
    findByPidAll,
    findInvolv
} = require('../controllers/modules');


router.get('/', find); //获取分页数据

router.get('/involv/:id', findInvolv); //根据MID查找项目名称和模块名称

router.get('/all/:id', findByPidAll); //获取某项目全部数据

router.post('/', create); //创建数据

router.patch('/:id', update); //更新数据

router.post('/delete', del); //删除数据

module.exports = router;
