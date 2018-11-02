import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store'
import './permission'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/icon.css';
import "babel-polyfill";

import {getRequest} from './util/api'
import {postRequest} from './util/api'

Vue.use(ElementUI, {size: 'small'});
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;


new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});







