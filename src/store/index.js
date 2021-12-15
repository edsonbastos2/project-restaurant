import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedCategory: ''
  },
  mutations: {
    CHANGE_CATEGORY(state, payload){
      state.selectedCategory = payload
    }
  },
  actions: {
    changerCategory(context, payload){
      context.commit('CHANGE_CATEGORY', payload)
    }
  },
  modules: {
  }
})
