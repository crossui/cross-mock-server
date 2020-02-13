const DB = require('../models/interfaces');
const Mockjs = require("mockjs");
const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

const settimeoutResult = (time) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), time * 1000);
  });
}
class MockCtl {
  //查找全部用户并做分页处理
  async find(ctx) {
    let url = ctx.request.url.split('?')[0]
    const pathNode = pathToRegexp('/mock/:pid(.{25})/:apiurl*').exec(url);
    if (pathNode === null) {
      ctx.body = { message: "该接口地址不存在", code: 204 }
    } else {
      if (pathNode[2] === undefined) {
        ctx.body = { message: "该接口地址不存在", code: 204 }
        return
      }
      try {
        const p = await DB.findByPid(pathNode[1]); // 根据项目的ID找到项目信息以获取项目的唯一ID
        if (p.length > 0) {
          let mockUrl = pathNode[2]
          const rows = p.filter(item => {
            return pathToRegexp(item.api_url).exec(mockUrl); // pathToRegexp 匹配url表达式
          });
          if (rows.length == 0) throw "";
          let result = JSON.parse(rows[0].api_content)
          if (rows[0].is_mockjs === 0) {
            result = Mockjs.mock(result)
          }
          //设置headers
          let headerObj = JSON.parse(rows[0].api_req_header)
          let headers = Object.keys(headerObj)
          if (headers.length !== 0) {
            ctx.set("Access-Control-Expose-Headers", "*");
            headers.forEach((key) => {
              ctx.append(key, headerObj[key]);
            });
          }
          //延迟返回数据
          if (rows[0].api_lazy_time > 0) {
            await settimeoutResult(rows[0].api_lazy_time)
          }
          ctx.body = result; // { message: "MOCK成功", data: result, code: rows[0].rcode }
        } else {
          ctx.body = { message: "该接口地址不存在", code: 204 }
        }
      } catch (error) {
        ctx.body = { message: "该接口地址不存在", code: 204 }
      }
    }
  };
}
module.exports = new MockCtl();
