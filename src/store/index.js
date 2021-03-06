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
      state.cartList.push({...payload, quantity: payload?.quantity || 1})
    },
    REMOVE_FROM_CART(state, payload){
      state.cartList.splice(payload, 1)
    },
    increaseQuantity(state, {index, quantity=1}){
      state.cartList[index].quantity += quantity
    },
    decreaseQuantity(state, index){
      --state.cartList[index].quantity
    },
    addObservation(state, {index, observation}){
      state.cartList[index].observation = observation
    }
  },
  actions: {
    changerCategory(context, payload){
      context.commit('CHANGE_CATEGORY', payload)
    },

    addCarlist({state, commit}, payload){
      const cartItem = state.cartList.find(cartItem => cartItem.id === payload.id)
      if(!cartItem){
        commit('SET_ITEM_LIST', payload)
        return
      }

      const index = state.cartList.findIndex(cartItem => cartItem.id === payload.id)
      commit('increaseQuantity', {index:index, quantity:payload?.quantity || 1})

      if(payload.observation){
        commit('addObservation',{
          index:index,
          observation: payload.observation
        })
      }
    },

    setObservation({state, commit}, payload){
      const index = state.cartList.findIndex(cartItem => cartItem.id === payload.id)
      commit('addObservation', {
        index: index,
        observation: payload.observation
      })
    },

    removeFromCart({state, commit}, id){
      const index = state.cartList.findIndex(cartItem => cartItem.id === id)
      if(index !== -1){
        commit('REMOVE_FROM_CART', index)
      }
    },

    increaseQuantity({state,commit}, id){
      const index = state.cartList.findIndex(cartItem => cartItem.id === id)
      commit('increaseQuantity', {index})
    },

    decreaseQuantity({state, commit}, id){
      const index = state.cartList.findIndex(cartItem => cartItem.id === id)
      commit('decreaseQuantity', index)
    }
  },
  getters: {
    $getTotal: state =>{
      return state.cartList.reduce((acc, item) => {
        return  acc + (item.price * item.quantity)
      },0)
    }
  }
})
