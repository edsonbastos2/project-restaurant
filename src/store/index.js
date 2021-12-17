import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedCategory: '',
    cartList: []
  },
  mutations: {
    CHANGE_CATEGORY(state, payload){
      state.selectedCategory = payload
    },
    SET_ITEM_LIST(state, payload){
      state.cartList.push(payload)
    }
  },
  actions: {
    changerCategory(context, payload){
      context.commit('CHANGE_CATEGORY', payload)
    },

    addCarlist(context, payload){
      context.commit('SET_ITEM_LIST', payload)
    }
  },
  modules: {
  }
})
