const DB = require('../models/mock');
const { pathToRegexp, match, parse, compile } = require("path-to-regexp");
class MockCtl {
  //查找全部用户并做分页处理
  async find(ctx) {
    //32c8 be00-3741-11ea-bae2-2
    const match = pathToRegexp('/mock/:pid(.{25})/:mid/:apiurl*').exec(ctx.request.url);
    console.info(match)
    ctx.body = { message: "ok", data: [], code: 200 }
  };
}
module.exports = new MockCtl();
