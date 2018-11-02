

const cache = {
    state: {
        noCacheName: ''
    },

    mutations: {
        SET_NOCACHE: (state,noCacheName ) => {
            state.noCacheName = noCacheName
        }
    },

    actions: {
        // 获取用户信息
        updateNoCache({commit, state},data) {
            return new Promise((resolve, reject) => {
                commit('SET_NOCACHE',data)
            })
        }

    }
};

export default cache
