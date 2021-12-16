import Vuex from "vuex";

import { workers } from './modules/workers'
import { products } from './modules/products'
import { user } from './modules/user'
import { table } from './modules/table'

export default Vuex.createStore({

    modules: {
        worker: workers,
        products: products,
        user: user,
        table: table
    }

});