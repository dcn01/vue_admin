
import {getToken, setToken, removeToken} from '@/util/auth'
import {postRequest} from '@/util/api'
import axios from 'axios';

const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        setting: {
            articlePlatform: []
        }
    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            setToken(token);
            state.token = token
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {

        // 获取用户信息
        GetUserInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                axios.get('/api/sys/user/info').then(res => {
                    if (res.ret && res.data) {
                        if (res.data.roles && res.data.roles.length > 0) {
                            commit('SET_ROLES', res.data.roles);
                            commit('SET_NAME', res.data.name);
                            commit('SET_AVATAR', res.data.avatar);
                            commit('SET_INTRODUCTION', res.data.introduction)
                        } else {
                            reject('getInfo: roles must be a non-null array !')
                        }

                        resolve(res)
                    }
                }).catch(error => {
                    reject(error)
                });

            })
        },



        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                /*logout(state.token).then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    removeToken();
                    resolve()
                }).catch(error => {
                    reject(error)
                })*/
            })
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                removeToken();
                resolve();
            })
        },

    }
};

export default user
