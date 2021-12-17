const pms = {
    namespaced: true,
    state: {
        userRole:"admin"
    },
    getters: {
        GE_POST_LIST: state => state.userRole
    },
    mutations: {
        MU_POST_LIST: (state, payload) => {
            state.postList = payload
        }
    },
    actions: {
        AC_USER_NAME: ({ commit }, payload) => {
            commit('MU_POST_LIST', payload)
        }
    }
}

export default pms