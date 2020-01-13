const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const {
    find,
    create,
    // login
} = require('../controllers/users');


router.get('/', find); //获取全部用户

router.post('/', create); //获取全部用户

// router.post('/login', login); //用户登陆

module.exports = router;
