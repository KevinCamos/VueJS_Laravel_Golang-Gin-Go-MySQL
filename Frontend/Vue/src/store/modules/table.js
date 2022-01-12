import Constant from "../../Constant";
import TableService from "@/services/TableService";
import OrderService from "@/services/OrderService";

export const table = {
  namespaced: true,
  state: {},
  mutations: {
    [Constant.ADD_TABLE]: (state, payload) => {
      console.log(payload);
      state.tablelist.push({ ...payload });
    },
    [Constant.END_TABLE]: (state, payload) => {
      console.log(payload);
      console.log("payload",payload)
      let index = state.tablelist.findIndex(
        (item) => {
          console.log( "item",item)
          try{
            console.log( item.order.id_order === payload.id_order)
            return(  item.order.id_order === payload.id_order)
          }catch{
            return false
          }
          
        }
      );
      state.tablelist[index].status="active"
      },
    [Constant.DELETE_TABLE]: (state, payload) => {
      console.log(payload);
      let index = state.tablelist.findIndex(
        (item) => item.id_table === payload.id
      );
      state.tablelist.splice(index, 1);
    },
    [Constant.UPDATE_TABLE]: (state, payload) => {
      let index = state.tablelist.findIndex(
        (item) => item.id_table === payload.id_table
      );
      state.tablelist[index] = payload;
    },
    [Constant.CANCEL_ORDER_TABLE]: (state, payload) => {
      let index = state.tablelist.findIndex(
        (item) => item.id_table === payload.id_table
      );
      state.tablelist[index] = {
        id_table: payload.id_table,
        id_order: null,
        status: "active",
        order: null,
      };
    },
    [Constant.INITIALIZE_TABLE]: (state, payload) => {
      if (payload) {
        state.tablelist = payload;
      } else {
        state.tablelist = {
          id_table: "",
          id_order: "",
          status: "",
        };
      }
    },
  },
  actions: {
    [Constant.ADD_TABLE]: (store, payload) => {
      TableService.createTable(payload.tableitem)
        .then(function (res) {
          store.commit(Constant.ADD_TABLE, res.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    [Constant.END_TABLE]: (store, payload) => {
      
          store.commit(Constant.END_TABLE, payload);
       
    },
    [Constant.DELETE_TABLE]: (store, payload) => {
      TableService.deleteTableById(payload.id)
        .then(function (res) {
          if (res.data.message !== "OK") {
            throw new Error({
              Message: "Ha habido algún problema al eliminar el producto",
            });
          }
          store.commit(Constant.DELETE_TABLE, payload);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    [Constant.CANCEL_ORDER_TABLE]: (store, payload) => {
      OrderService.cancelOrderById(payload.id_order)
        .then(function (res) {
          console.log(res);
          store.commit(Constant.CANCEL_ORDER_TABLE, payload);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    [Constant.UPDATE_TABLE]: (store, payload) => {
      TableService.updateTable(payload.tableitem, payload.id)
        .then(function (res) {
          store.commit(Constant.UPDATE_TABLE, res.data.data[0]);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    [Constant.INITIALIZE_TABLE]: (store /* payload */) => {
      TableService.getAllTables()
        .then(function (res) {
          console.log(res.data.data);
          store.commit(Constant.INITIALIZE_TABLE, res.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  getters: {
    getTable(state) {
      return state.tablelist;
    },
    getOrder(state) {
      if (state.tablelist) {
          var orders = state.tablelist.filter(function(element){
            return element.order != null;
          }).map(function (element) {
            return element.order;
          
        })
        console.log(orders);
        return orders;
      }
      return;
    },
  },
};
