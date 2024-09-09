import axois from 'axios';
import Config from 'react-native-config';
import axios from "axios";

//从环境文件读取接口基本路径
// axois.defaults.baseURL = 'http://192.168.1.8:4523/m1/5106198-0-default';
axios.defaults.baseURL = Config.API_URL
//添加请求拦截器
axois.interceptors.request.use(
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
axois.interceptors.response.use(function (response) {
  return response.data;
});
