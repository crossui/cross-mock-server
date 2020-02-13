import axios from 'axios';
import { message } from 'vcu';

// 创建一个AXIOS实例 (请求不同服务器地址或超时时长等等可以创建不同的实例)
const request = axios.create({
    baseURL: 'http://localhost:8033', //请求的域名基本地址     process.env.VUE_APP_BASE_API, // url = base url + request url     
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
    response => {
        const res = response.data;
        return res
    },
    error => {
        console.log('err' + error); // for debug
        //请求失败服务未响应
        message.error("请求失败服务未响应")
        return Promise.reject(error)
    }
);

export default request