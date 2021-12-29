import Constant from "../../Constant";
import OrderService from "@/services/OrderService";

export const order = {
  namespaced: true,
  state: {
    orderlist: [
      { id: 0, data:[
        { id: 3, qty: 2 },
        { id: 4, qty: 0},
        { id: 2, qty: 1 },
      ] },
      { id: 1, data:[
        { id: 3, qty: 5 },
        { id: 4, qty: 2 },
        { id: 2, qty: 1 },
      ] }
    ],
  },
  mutations: {
    [Constant.ADD_ORDER]: (state, payload) => {
      console.log(payload);
      state.orderlist.push({ ...payload });
    },

    [Constant.INITIALIZE_ORDER]: (state, payload) => {
      if (payload) state.orderlist = payload;
      else state.orderlist = [];
    },
  },
  actions: {
    [Constant.ADD_ORDER]: (store, payload) => {
      console.log(payload);
      console.log(payload.order);
      // OrderService.createOrder(payload.order)
      // .then(function (res) {
      // console.log(res)
      //     store.commit(Constant.ADD_ORDER, res.data.data);
      // })
      // .catch(function (error) {
      //     console.log(error)
      // })
      
    },

    [Constant.INITIALIZE_ORDER]: (store /* payload */) => {
      OrderService.getAllOrders()
        .then(function (res) {
          store.commit(Constant.INITIALIZE_ORDER, res.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  getters: {
    getOrder(state) {
      return state.orderlist;
    },
  },
};
