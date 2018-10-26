import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/icon.css';
import "babel-polyfill";
import store from './store'
import {getRequest} from './util/api'
import {postRequest} from './util/api'
import { getToken } from './util/auth' // getToken from cookie
Vue.use(ElementUI, {size: 'small'});

Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;

const whiteList = ['/login', '/auth-redirect'];

function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
    if (!permissionRoles) return true;
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
                store.dispatch('GetUserInfo').then(res => { // 拉取user_info
                    const roles = res.data.roles;
                    debugger;
                    store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
                        router.addRoutes(store.getters.addRouters) ;// 动态添加可访问路由表
                        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                    })
                }).catch((err) => {
                    store.dispatch('FedLogOut').then(() => {
                        Message.error(err || 'Verification failed, please login again')
                        next({ path: '/' })
                    })
                })
            } else {
                // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
                if (hasPermission(store.getters.roles, to.meta.roles)) {
                    next()
                } else {
                    next({ path: '/401', replace: true, query: { noGoBack: true }})
                }
                // 可删 ↑
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
});

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});







