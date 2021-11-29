import Vuex from "vuex";

import { workers } from './modules/workers'
import { products } from './modules/products'

export default Vuex.createStore({

    modules: {
        worker: workers,
        products: products
    }

});