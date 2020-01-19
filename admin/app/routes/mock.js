const Router = require('koa-router');
const router = new Router({ prefix: '/mock' });
const {
    find
} = require('../controllers/mock');
router.all('*', find); //

module.exports = router;
