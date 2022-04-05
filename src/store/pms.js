const pms = {
    namespaced: true,
    state: {
        CD0000000000N:[],
        CD1000000001N:[],
        CD1000000002N:[],
        CD1000000003N:[],
        CD1000000004N:[],
        CD1000000005N:[],
        CD1000000006N:[],
        CD1000000007N:[],
        CD1000000008N:[],
        CD1000000009N:[],
        CD1000000010N:[],
        CD1000000011N:[],
        CD1000000012N:[],
        CD1000000013N:[],
        CD1000000014N:[],
        CD1000000015N:[],
        CD1000000016N:[],
        CD1000000017N:[],
        CD1000000018N:[],
        CD1000000019N:[],
        CD1000000020N:[],
        CD1000000021N:[],
        CD1000000022N:[],
        CD1000000023N:[],
        CD1000000024N:[],
        CD1000000025N:[],
        CD1000000026N:[],
        CD1000000027N:[],
        CD1000000028N:[],
        CD1000000029N:[],
        CD1000000030N:[],
        CD1000000031N:[],
        CD1000000032N:[],
        CD1000000033N:[],
        CD1000000034N:[],
        CD1000000035N:[],
        CD1000000036N:[],
        CD1000000037N:[],
        CD1000000038N:[],
        CD1000000039N:[],
        CD1000000040N:[],


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
            state.CD1000000005N = array[5];
            state.CD1000000006N = array[6];
            state.CD1000000007N = array[7];
            state.CD1000000008N = array[8];
            state.CD1000000009N = array[9];
            state.CD1000000010N = array[10];
            state.CD1000000011N = array[11];
            state.CD1000000012N = array[12];
            state.CD1000000013N = array[13];
            state.CD1000000014N = array[14];
            state.CD1000000015N = array[15];
            state.CD1000000016N = array[16];
            state.CD1000000017N = array[17];
            state.CD1000000018N = array[18];
            state.CD1000000019N = array[19];
            state.CD1000000020N = array[20];
            state.CD1000000021N = array[21];
            state.CD1000000022N = array[22];
            state.CD1000000023N = array[23];
            state.CD1000000024N = array[24];
            state.CD1000000025N = array[25];
            state.CD1000000026N = array[26];
            state.CD1000000027N = array[27];
            state.CD1000000028N = array[28];
            state.CD1000000029N = array[29];
            state.CD1000000030N = array[30];
            state.CD1000000031N = array[31];
            state.CD1000000032N = array[32];
            state.CD1000000033N = array[33];
            state.CD1000000034N = array[34];
            state.CD1000000035N = array[35];
            state.CD1000000036N = array[36];
            state.CD1000000037N = array[37];
            state.CD1000000038N = array[38];
            state.CD1000000039N = array[39];
            state.CD1000000040N = array[40];
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