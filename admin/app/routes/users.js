const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const {
    find,
    create,
    login,
    update,
    delete: del
} = require('../controllers/users');


router.get('/', find); //获取全部用户

router.post('/', create); //获取全部用户

router.post('/login', login); //用户登陆

router.post('/login', login); //用户登陆

router.patch('/:id', update); //更新用户

router.post('/delete', del); //删除用户

module.exports = router;
