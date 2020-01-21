const Router = require('koa-router');
const router = new Router({ prefix: '/exports' });


const {
    exportWord,
    exportPdf
} = require('../controllers/exports');


router.post('/word', exportWord); //导出WORD

router.post('/pdf', exportPdf); //导出PDF

module.exports = router;
