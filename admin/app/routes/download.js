const Router = require('koa-router');
const router = new Router({ prefix: '/download' });
const send = require('koa-send');


router.get('/:filename', async (ctx) => {
    const filename = ctx.params.filename;
    const path = `./app/public/exports/${filename}.docx`;
    ctx.attachment(path);
    await send(ctx, path);
}); //导出WORD

module.exports = router;
