import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser:[],
    products: [
      // {
      //   id: 1,
      //   name: "Sugar Bag",
      //   image: "../assets/ingredients/1.jpg",
      //   value: Math.floor(Math.random() * 400),
      //   rating: 3,
      //   price: 400,
      //   description:
      //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eos!",
      //   active: true,
      //   quantity:1,
      //   total:400
      // },
    ],
    cartProduct: [],
    billProduct:[]
  },
  mutations: {
    getUser(state,payload){
      state.currentUser = payload;
    },
    getProduct(state,payload){
      state.products = [];
      state.cartProduct = [];
      payload.forEach(item => {
        let temp = 
        {
          id: item.providerId,
          name: item.name,
          image: item.image,
          value: Math.floor(Math.random() * 400),
          rating: 4,
          price:  item.price,
          description:item.description,
          active: true,
          quantity:1,
          total:item.price
        }
        state.products.push(temp)
      });
    },

    changeState(state, payload) {
      state.products.forEach((item) => {
        if (payload === item.id) {
          item.active = !item.active;
        }
      });
    },

    cartProduct(state, payload) {
        let data = state.products.filter(item => {
          return item.id === payload
        });       
        state.cartProduct.push(data[0]);
    },

    removeProduct(state,payload){
      let data = state.cartProduct.filter(item => {
        return item.id !== payload
      });
      state.cartProduct = data;
    },
    plusQuantity(state,payload){
      state.products.forEach((item) => {
        if (payload === item.id) {
          item.quantity = item.quantity + 1;
          item.total = item.price * item.quantity;
        }
      });
    },
    removeQuantity(state,payload){
      state.products.forEach((item) => {
        if (payload === item.id) {
          item.quantity = item.quantity - 1;
          item.total = item.price * item.quantity;
        }
      });
    },
    addBill(state,payload){
      state.billProduct = payload;
    },
    updateBill(state,payload){
      let data = {
        bill: state.billProduct.bill,
        stateL:payload
      }
      state.billProduct = data;
    }
  },
  getters:{
   
    totalPlusCart: state =>{
      let total = 0;
      state.cartProduct.map((item) => {
        total += item.total
        return item.total;
      });
      return total;
    }
  },
  actions: {},
  modules: {},
});
