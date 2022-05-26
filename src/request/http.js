import axios from 'axios';
import { Toast } from 'vant';
import { getTokenAUTH } from './auth';

/**
 * 加载动画
 * */
// 开始加载
function startLoading() {
  Toast.loading({
    forbidClick: true,
    duration: '1000'
  });
}
// 结束加载
function endLoading() {
  Toast.clear();
}

function http(axiosConfig, customOptions) {
  const service = axios.create({
    // 需要设置跨域
    baseURL: 'api', // 设置统一的请求前缀
    timeout: 10000 // 设置统一的超时时长
  });
  // 自定义配置
  let custom_options = Object.assign(
    {
      loading: false, // 是否开启loading层效果, 默认为false
      message: false // 是否使用后端返回 message, 默认为false
    },
    customOptions
  );
  // 是否开启loading层效果
  if (custom_options.loading) {
    startLoading();
    return;
  }
  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      // 自动携带token
      if (getTokenAUTH() && typeof window !== 'undefined') {
        config.headers = {
          'content-type': 'application/json',
          'x-token': getTokenAUTH()
        };
      }
      return config;
    },
    (error) => {
      endLoading();
      return Promise.reject(error);
    }
  );
  // 响应拦截
  service.interceptors.response.use(
    (response) => {
      endLoading();
      switch (response.data.code) {
        case 400:
          Toast.fail({
            message: response.data.msg,
            duration: '1000'
          });
          break;
        case 401:
          Toast.fail({
            message: response.data.msg,
            duration: '1000'
          });
          break;
        case 200:
          Toast.success({
            message: custom_options.message ? response.data.msg : '',
            // 后端传递的 msg 不是很好看，自己写吧
            duration: '1000'
          });
          return response.data;
        default:
          Toast.fail({
            message: `'错误码：'${response.data.code}, '错误信息：'${response.data.msg}`,
            duration: '2000'
          });
          return;
      }
    },
    (error) => {
      endLoading();
      return Promise.reject(error); // 错误继续返回给到具体页面
    }
  );

  return service(axiosConfig);
}

export default http;
