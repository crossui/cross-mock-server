const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const {
    find
} = require('../controllers/users');


router.get('/', find); //获取全部用户


module.exports = router;