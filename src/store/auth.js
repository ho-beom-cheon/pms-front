import { saveAuthToCookie, saveUserToCookie, getUserFromCookie, getAuthFromCookie } from '@/utils/cookies';
import { loginUser } from '@/api/auth';

const auth = {
    namespaced: true,
    state: {
        username: getUserFromCookie() || '',
        token: getAuthFromCookie() || ''
    },
    mutations: {
        setUserInfo(state, userInfo) {
            console.log("userInfo: " + userInfo.userId )
            console.log("userInfo: " + userInfo.token )
            state.userId = userInfo.userId;
            state.token = userInfo.token;
        }
    },
    actions: {
        async LOGIN({ commit }, userInfo) {
            console.log("auth: " + userInfo.auth_token )
            const { data } = await loginUser(userInfo); // api 호출
            commit('setUserInfo', data);
            saveAuthToCookie(data.token);
            saveUserToCookie(data.userId);
            console.log(" getUserFromCookie() ::" ,  getUserFromCookie())
            console.log(" getAuthFromCookie() ::" ,  getAuthFromCookie())
            
        }
    }
}
export default auth