import Constant from "../../Constant";
import OrderService from "@/services/OrderService";
import ProductsService from "@/services/ProductsService";

export const chart = {
    namespaced: true,
    state: {
        labels_doughnutChart : [],
        data_doughnutChart : [],
        labels_barChart : [],
        data_barChart : []
    },
    mutations: {
        [Constant.GET_CATEGORIES_PRODUCTS_CHART]: (state, payload) => {
            if (payload) {
                for (var i in payload) {
                    state.labels_doughnutChart[i] = payload[i].name;
                    state.data_doughnutChart[i] = payload[i].count;
                }
            }
            console.log(state);
        },
        [Constant.GET_PRODUCTS_ORDER_CHART]: (state, payload) => {
        if (payload) {
            for (var i in payload) {
                state.labels_barChart[i] = payload[i].product;
                state.data_barChart[i] = payload[i].qty;
            }
        }
        console.log(state);
        },
    },
    actions: {
        [Constant.GET_CATEGORIES_PRODUCTS_CHART]: (store) => {
            ProductsService.getCategoriesProductsChart()
            .then(function (res) {
                console.log(res.data.data);
                store.commit(Constant.GET_CATEGORIES_PRODUCTS_CHART, res.data.data);
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        [Constant.GET_PRODUCTS_ORDER_CHART]: (store) => {
        OrderService.getProductsOrderChart()
            .then(function (res) {
            console.log(res.data.data);
            store.commit(Constant.GET_PRODUCTS_ORDER_CHART, res.data.data);
            })
            .catch(function (error) {
            console.log(error);
            });
        },
    },
    getters: {
        getBarChartLabels(state) {
        return state.labels_barChart;
        },
        getBarChartData(state) {
        return state.data_barChart;
        },
        getDoughnutChartLabels(state) {
            return state.labels_doughnutChart;
        },
        getDoughnutChartData(state) {
            return state.data_doughnutChart;
        },
    },
};
