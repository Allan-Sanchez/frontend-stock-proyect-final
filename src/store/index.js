import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [
      {
        id: 1,
        name: "Sugar Bag",
        image: "1.jpg",
        value: Math.floor(Math.random() * 400),
        rating: 3,
        price: 400,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eos!",
        active: true,
        quantity:1,
        total:400
      },
      {
        id: 2,
        name: "Salt Bag",
        image: "2.jpg",
        value: Math.floor(Math.random() * 400),
        rating: 4,
        price: 100,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eos!",
        active: true,
        quantity:1,
        total:100
      },
      {
        id: 3,
        name: "Milk",
        image: "3.jpg",
        value: Math.floor(Math.random() * 400),
        rating: 3.5,
        price: 600,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eos!",
        active: true,
        quantity:1,
        total:600
      },
      {
        id: 4,
        name: "Flour Bag",
        image: "4.jpg",
        value: Math.floor(Math.random() * 400),
        rating: 3.5,
        price: 400,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eos!",
        active: true,
        quantity:1,
        total:400
      },
      {
        id: 5,
        name: "Chocolate",
        image: "5.jpg",
        value: Math.floor(Math.random() * 400),
        rating: 5,
        price: 900,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eos!",
        active: true,
        quantity:1,
        total:900
      },
      {
        id: 6,
        name: "Butter",
        image: "6.jpg",
        value: Math.floor(Math.random() * 400),
        rating: 3.5,
        price: 200,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eos!",
        active: true,
        quantity:1,
        total:200
      },
      {
        id: 7,
        name: "Yeast",
        image: "7.jpg",
        value: Math.floor(Math.random() * 400),
        rating: 4.5,
        price: 350,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eos!",
        active: true,
        quantity:1,
        total:350
      },
      {
        id: 8,
        name: "Egg",
        image: "8.png",
        value: Math.floor(Math.random() * 400),
        rating: 4.5,
        price: 200,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eos!",
        active: true,
        quantity:1,
        total:200
      },
      {
        id: 9,
        name: "Vanilla",
        image: "9.jpeg",
        value: Math.floor(Math.random() * 400),
        rating: 4,
        price: 150,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eos!",
        active: true,
        quantity:1,
        total:150
      },
    ],
    cartProduct: [],
    billProduct:[]
  },
  mutations: {
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
