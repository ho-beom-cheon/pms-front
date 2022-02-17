import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'



Vue.use(Vuex)

// 작성한 모듈을 가져옵니다.
import pms from '@/store/pms'
import auth from '@/store/auth'
import dragAction from '@/store/dragAction'

const store = new Vuex.Store({
  modules: {
    pms,
    auth,
    dragAction,
  },
  plugins : [
    createPersistedState({
      paths : ["pms"]
    })
  ]
})

export default store