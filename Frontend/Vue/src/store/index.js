import Vuex from "vuex";

import { workers } from './modules/workers'
import { products } from './modules/products'
import { user } from './modules/user'

export default Vuex.createStore({

    modules: {
        worker: workers,
        products: products,
        user: user
    }

});