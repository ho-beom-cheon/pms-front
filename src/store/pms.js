import {loginUser} from "@/api/auth";

const pms = {
    namespaced: true,
    state: {
        CD0000000000N:[],
        CD1000000001N:[],
        CD1000000002N:[],
        CD1000000003N:[],
        CD1000000004N:[],
    },
    getters: {
        CD1000000001N : state => state.CD1000000001N
    },
    mutations: {
        SET_CD_ALL(state, array){
            state.CD0000000000N = array[0];
            state.CD1000000001N = array[1];
            state.CD1000000002N = array[2];
            state.CD1000000003N = array[3];
            state.CD1000000004N = array[4];
        },
    },
    actions: {
        async SET_COMBO({ commit }, data) {
            //const {data} = await loginUser(); // api 호출
            commit('SET_CD_ALL', data);
        }
    }
}

export default pms