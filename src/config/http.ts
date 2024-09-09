import Config from 'react-native-config';
import axios from 'axios';

//从环境文件读取接口基本路径
axios.defaults.baseURL = 'http://localhost:4523/m1/5106198-0-default';
// axios.defaults.baseURL = Config.API_URL
//添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    //@ts-ignore
    config.headers = {
      icode: '860CD64330791BC0',
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

//添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  error => {
    console.log(error.message);
    return Promise.reject(error);
  },
);
