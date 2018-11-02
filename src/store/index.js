import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import user from './modules/user'
import cache from './modules/cache'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        permission,
        user,
        cache
    },
    getters
});

export default store
