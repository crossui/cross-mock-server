/*数据库默认配置*/
const database = {
    database: 'mock_server', //数据库名称
    user: 'root', //mysql用户名
    password: 'root123', //mysql密码
    PORT: '3306', //mysql端口号
    prefix: 'cross_', //表前缀
    host: "10.16.0.78" //服务器ip
};

const serviceport = "8033";


module.exports = { database, serviceport }

/* 
const database = {
    database: 'cross_mock_server', //数据库名称
    user: 'root', //mysql用户名
    password: '', //mysql密码
    PORT: '3306', //mysql端口号
    prefix: 'cross_', //表前缀
    host: "127.0.0.1" //服务器ip
};

const serviceport = "8033";
 */

module.exports = { database, serviceport }