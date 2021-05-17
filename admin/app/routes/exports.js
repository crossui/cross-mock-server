const Router = require('koa-router');
const router = new Router({ prefix: '/exports' });


const {
    exportWordModels,
    exportWord,
    exportPdf
} = require('../controllers/exports');

router.post('/word/models', exportWordModels); //按模块导出WORD

router.post('/word', exportWord); //导出WORD

router.post('/pdf', exportPdf); //导出PDF

module.exports = router;
