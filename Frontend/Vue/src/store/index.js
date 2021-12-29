import Vuex from "vuex";

import { workers } from './modules/workers'
import { products } from './modules/products'
import { categories } from './modules/categories'
import { user } from './modules/user'
import { table } from './modules/table'
import { order } from './modules/order'

export default Vuex.createStore({

    modules: {
        worker: workers,
        products: products,
        categories: categories,
        user: user,
        table: table,
        order: order,
    //     worker:  () => import('./modules/workers'),
    //     products: () => import('./modules/products'),
    //     user:  () => import('./modules/user'),
    //     table: () => import('./modules/table'),
    //     order:  () => import('./modules/order'),
    // }
    }

});