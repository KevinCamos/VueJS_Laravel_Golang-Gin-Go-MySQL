import Vuex from "vuex";

import { workers } from './modules/workers'

export default Vuex.createStore({
   
    modules: {
        worker: workers,
    }

});