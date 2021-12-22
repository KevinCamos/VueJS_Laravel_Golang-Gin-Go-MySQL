import Constant from '../../Constant';
// import shortid from 'shortid';
import WorkerService from '@/services/WorkerService'

export const workers = {
    namespaced: true,
    state: {
    },
    mutations: {
        [Constant.ADD_WORKER]: (state, payload) => {
            console.log(payload)
            state.workerlist.push({ ...payload });
        },
        [Constant.DELETE_WORKER]: (state, payload) => {
            let index = state.workerlist.findIndex((item) => item.id === payload.id);
            state.workerlist.splice(index, 1);
        },

        [Constant.UPDATE_WORKER]: (state, payload) => {
            let index = state.workerlist.findIndex((item) => item.id === payload.id);
            state.workerlist[index] = payload;
        },
        [Constant.INITIALIZE_WORKERITEM]: (state, payload) => {
            if (payload) {
                state.workerlist = payload;
            } 
        },
        [Constant.LOGIN_ADMIN_WORKER]: (state, payload) => {
            localStorage.token = payload.user.token;

        },
    },
    actions: {
        [Constant.ADD_WORKER]: (store, payload) => {

            WorkerService.createUser(payload.workeritem)
                .then(function (worker) {
                    store.commit(Constant.ADD_WORKER, worker.data);
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        [Constant.DELETE_WORKER]: (store, payload) => {

            WorkerService.deleteById(payload.id)
                .then(function (res) {
                    if (res.statusText !== "OK") {
                        throw new Error({ 'Message': 'Ha habido algún problema al eliminar al trabajador' })
                    }
                    store.commit(Constant.DELETE_WORKER, payload);
                }
                )
                .catch(function (error) {
                    console.log(error)
                })
        },
        // [Constant.TOGGLE_DONE]: (store, payload) => {
        //     store.commit(Constant.TOGGLE_DONE, payload);
        // },
        [Constant.UPDATE_WORKER]: (store, payload) => {
            payload.workeritem.id = payload.workeritem.id ? payload.workeritem.id : payload.workeritem.ID

            WorkerService.updateUser(payload.workeritem, payload.workeritem.id)
                .then(function (worker) {
                    store.commit(Constant.UPDATE_WORKER, worker.data);
                    // resolve(workers)
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        [Constant.INITIALIZE_WORKERITEM]: (store, /* payload */) => {

            WorkerService.getAll()
                .then(function (workers) {
                    store.commit(Constant.INITIALIZE_WORKERITEM, workers.data);
                    // resolve(workers)
                })
                .catch(function (error) {
                    store.commit(Constant.INITIALIZE_WORKERITEM, false);
                })
        },


    },
    getters: {
        getWorkers(state) {
            return state.workerlist;
        }
    }

}