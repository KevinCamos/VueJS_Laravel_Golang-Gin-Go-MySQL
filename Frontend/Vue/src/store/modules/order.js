import Constant from "../../Constant";
import OrderService from "@/services/OrderService";

export const order = {
  namespaced: true,
  state: {
    orderlist: [],
  },
  mutations: {
    [Constant.ADD_ORDER]: (state, payload) => {
      console.log(payload);
      state.orderlist.push({ ...payload });
      console.log(state.orderlist);
    },
    [Constant.UPDATE_ORDER]: (state, payload) => {
      // let index = state.orderlist.findIndex((item) => item.id_order === payload.id);
      // state.orderlist[index].order_list = payload.order;
    },
    [Constant.CANCEL_ORDER]: (state, payload) => {
      // let index = state.orderlist.findIndex((item) => item.id_order === payload.id);
   /*    console.log(index)
      console.log(state.orderlist)
      console.log(typeof(state.orderlist))

       state.orderlist.slice(index,1)
      console.log(state.orderlist) */
      var i = state.orderlist.length;
      if(i>0){
      while(i--){
         if( state.orderlist[i] 
             && state.orderlist[i].hasOwnProperty("id_order") 
             && (arguments.length > 2 && state.orderlist[i]["id_order"] === payload.id ) ){ 
  
              state.orderlist.splice(i,1);
  
         }
      }}

    },
    [Constant.INITIALIZE_ORDER]: (state, payload) => {
      if (payload) state.orderlist = payload;
      else state.orderlist = [];
    },
  },/*      let index = state.workerlist.findIndex((item) => item.id === payload.id);
  state.workerlist.splice(index, 1); */
  actions: {
    [Constant.ADD_ORDER]: (store, payload) => {
      OrderService.createOrder(payload)
        .then(function (res) {
          console.log(res);
          store.commit(Constant.ADD_ORDER, res.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    [Constant.UPDATE_ORDER]: (store, payload) => {
      var data = { order: payload.order };
      OrderService.updateOrder(data, payload.id)
        .then(function (res) {
          console.log(res);
          store.commit(Constant.ADD_ORDER, res.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    
    [Constant.CANCEL_ORDER]: (store, payload) => {
      OrderService.cancelOrderById(payload.id)
        .then(function (res) {
          console.log(res);
          store.commit(Constant.CANCEL_ORDER, payload);
        })
        .catch(function (error) {
          console.log(error);
        });
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
