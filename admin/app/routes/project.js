const Router = require('koa-router');
const router = new Router({ prefix: '/project' });
const {
    find,
    create,
    update,
    delete: del
} = require('../controllers/project');


router.get('/', find); //获取全部用户

router.post('/', create); //创建用户

router.patch('/:id', update); //更新用户

router.post('/delete', del); //删除用户

module.exports = router;
