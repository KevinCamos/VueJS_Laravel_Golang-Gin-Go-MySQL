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
            state.workerlist.push({ ...payload/* , id: shortid.generate(), done: false */ });
        },
        [Constant.DELETE_WORKER]: (state, payload) => {
            let index = state.workerlist.findIndex((item) => item.id === payload.id);
            state.workerlist.splice(index, 1);
        },
        // [Constant.TOGGLE_DONE]: (state, payload) => {
        //     let index = state.workerlist.findIndex((item) => item.id === payload.id);
        //     state.workerlist[index].done = !state.workerlist[index].done;
        // },
        [Constant.UPDATE_WORKER]: (state, payload) => {
            console.log(payload)
            let index = state.workerlist.findIndex((item) => item.id === payload.id);
            state.workerlist[index] = payload;
        },
        [Constant.INITIALIZE_WORKERITEM]: (state, payload) => {
            console.log(payload)
            if (payload) {
                state.workerlist = payload;
            } else {
                /*   state.workerlist = {
                      id: "",
                      // name: "",
                      // email: "",
                      // phone: "",
                      // address: "",
                      // appointment: "",
                  }; */
            }
        },
        [Constant.LOGIN_ADMIN_WORKER]: (state, payload) => {
            console.log(payload.user)
            localStorage.token = payload.user.token;
            console.log(localStorage.token)
            // let index = state.workerlist.findIndex((item) => item.id === payload.id);
            // state.workerlist[index] = payload;
        },
    },
    actions: {
        [Constant.ADD_WORKER]: (store, payload) => {
            console.log(payload)
            console.log(payload.workeritem)
            WorkerService.createUser(payload.workeritem)
                .then(function (worker) {
                    console.log(worker.data)
                    store.commit(Constant.ADD_WORKER, worker.data);
                    // resolve(workers)
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        [Constant.DELETE_WORKER]: (store, payload) => {
            console.log(payload)
            console.log(payload.id)
            WorkerService.deleteById(payload.id)
                .then(function (res) {
                    if (res.statusText !== "OK") {
                        throw new Error({ 'Message': 'Ha habido algún problema al eliminar al trabajador' })
                    }
                    console.log(res)
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

            console.log(payload.workeritem, payload.workeritem.id)
            WorkerService.updateUser(payload.workeritem, payload.workeritem.id)
                .then(function (worker) {
                    console.log(worker.data)
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
                    console.log(workers.data)
                    store.commit(Constant.INITIALIZE_WORKERITEM, workers.data);
                    // resolve(workers)
                })
                .catch(function (error) {
                    console.log(error)
                    store.commit(Constant.INITIALIZE_WORKERITEM, false);
                })
        },
        [Constant.LOGIN_ADMIN_WORKER]: (store, payload) => {
            console.log(payload)
            console.log(payload.dataUser)
            WorkerService.loginGo(payload.dataUser)
                .then(function (worker) {
                    console.log(worker.data)
                    const token = localStorage.getItem('token')
                    store.commit(Constant.LOGIN_ADMIN_WORKER, worker.data);
                    // resolve(workers)
                })
                .catch(function (error) {
                    console.log(error)
                })
        },

    },
    getters: {
        getWorkers(state) {
            return state.workerlist;
        }
    }

}