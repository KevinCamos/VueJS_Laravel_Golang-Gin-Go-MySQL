import Vuex from "vuex";
// import Constant from '../Constant';
// import shortid from 'shortid';
import { workers } from './modules/workers'
import { products } from './modules/products'

export default Vuex.createStore({
    state: {

    },

    mutations: {

    },
    actions: {
        
    }
    ,
    modules: {
        worker: workers,
        products: products
    }

});