import axios from 'axios'

// 创建一个AXIOS实例 (请求不同服务器地址或超时时长等等可以创建不同的实例)
const request = axios.create({
    baseURL: '', //请求的域名基本地址     process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // 跨域请求时发送cookies
    timeout: 8000 // 请求超时
})


// 请求拦截器
request.interceptors.request.use(
    config => {
        // 在发出请求前做点什么
        /* 
          例如：
          //让每个请求携带令牌
          //['x-token']是自定义头密钥
          if (store.getters.token) {
              config.headers['X-Token'] = getToken()
          }
        */
        return config
    },
    error => {
        // 处理请求错误
        console.log("请求拦截器", error) // for debug
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    /**
     *如果您想要获取诸如头或状态之类的http信息
     *请返回response=>response
     */

    /**
     *通过自定义代码确定请求状态
     *这里只是一个例子
     *您还可以通过HTTP状态代码判断状态
     */
    response => {
        const res = response.data;
        // 如果自定义代码不是20000，则判断为错误。
        /* if (res.code !== 20000) {
            //提示错误 并做一些相应的操作
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        } */
        return res;
    },
    error => {
        console.log('err' + error); // for debug
        //请求失败服务未响应
        this.$Message.error('服务器请求失败！！！');
        return Promise.reject(error)
    }
);

/**
 * 并发请求：axios.all() , axios.spread()
 *      axios.all(
 *          [
 *              axios.get('./data.json'),
 *              axios.get('city.json')
 *          ]
 *      ).then(
 *          axios.spread((dataRes,cityRes) => {
 *              console.log(dataRes,cityRes)
 *          })
 *      )
 *  
 *  */

/**
  * axios 取消请求

var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});
// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');

*/

export default request