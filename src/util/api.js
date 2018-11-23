import axios from 'axios';
import qs from 'qs';
import store from '../store'
import {Loading, Message, MessageBox} from 'element-ui'


axios.interceptors.request.use(config => {
    return config;
}, err => {
    Message.error({message: '请求超时!'});
});

// 超时时间
axios.defaults.timeout = 20000;
// http请求拦截器
var loadinginstace;
axios.interceptors.request.use(config => {
    // element ui Loading方法
    //loadinginstace = Loading.service({fullscreen: true});
    return config
}, error => {
    //loadinginstace.close();
    Message.error({
        message: '加载超时'
    });
    return Promise.reject(error)
});

axios.interceptors.response.use(response => {
    const data = response.data;
    if (response.status && !data.ret) {
        Message.error({message: data.msg});
        return data;
    }
    return data;
}, error => {
    debugger;
    if (error.response.status == 401) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            store.dispatch('FedLogOut').then(() => {
                location.reload();
            });
        }).catch(()=>{
            store.dispatch('FedLogOut').then(() => {
                location.reload();
            });
        });

        return Promise.reject('error');
    }else if (error.response.status == 403) {
        Message({
            message: '当前用户无相关操作权限！',
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject('error');
    }else {
        Message.error({message: '未知错误!'});
    }
});
let base = '/api';
export const postRequest = (url, params, elseHeaders) => {
    const data = qs.stringify(params);
    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    if (elseHeaders) {
        for (let type in elseHeaders) {
            headers[type] = elseHeaders[type]
        }
    }
    return axios({
        method: 'post',
        url: base + url,
        data: data,
        headers: headers
    });
};
export const uploadFileRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const getRequest = (url) => {
    return axios({
        method: 'get',
        url: base + url,
    });
};
