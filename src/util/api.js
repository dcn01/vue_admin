
import axios from 'axios';
import {Message} from 'element-ui';
import qs from 'qs';

/*axios.interceptors.request.use(config => {
    return config;
}, err => {
    Message.error({message: '请求超时!'});
    // return Promise.resolve(err);
});
axios.interceptors.response.use(data => {
    if (data.status && data.status == 200 && !data.data.ret) {
        Message.error({message: data.data.msg});
        return data;
    }
    if (data.data.msg) {
        Message.success({message: data.data.msg});
    }
    return data;
}, err => {
    if (err.response.status == 504 || err.response.status == 404) {
        Message.error({message: '服务器被吃了⊙﹏⊙∥'});
    } else if (err.response.status == 403) {
        Message.error({message: '权限不足,请联系管理员!'});
    } else if (err.response.status == 401) {
        Message.error({message: err.response.data.msg});
    } else {
        if (err.response.data.msg) {
            Message.error({message: err.response.data.msg});
        }else{
            Message.error({message: '未知错误!'});
        }
    }
    // return Promise.resolve(err);
});*/
let base = 'http://localhost:8002';
export const postRequest = (url, params,elseHeaders) => {

    const data = qs.stringify(params);
    var headers={
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    if (elseHeaders)  {
        for (let type in elseHeaders)  {
            headers[type]=elseHeaders[type]
        }
    }
    return axios({
        method: 'post',
        url: base+url,
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
        url: base+url,
    });
};
