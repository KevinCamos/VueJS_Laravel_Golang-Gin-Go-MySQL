import Constant from '../../Constant';
import shortid from 'shortid';
import WorkerService from '@/services/WorkerService'

export const workers = {
    state: {
        workerlist: [
            {
                "id": shortid.generate(),
                "name": "Juanan",
                "email": "Juanan@gmail.com",
                "phone": "845774411",
                "address": "C/ Desengaño, 21",
                "active": true,
                "date_active": "18-05-2020",
                "appointment": "auxiliar"
            }, {
                "id": shortid.generate(),
                "name": "Alex",
                "email": "Alex@gmail.com",
                "phone": "845774411",
                "address": "C/ L'estació, 21",
                "active": false,
                "date_active": "12-06-2020",
                "appointment": "auxiliar"
            }, {
                "id": shortid.generate(),
                "name": "Anna",
                "email": "Anna@gmail.com",
                "phone": "845774411",
                "address": "C/ San Loreanzo, 21",
                "active": true,
                "date_active": "12-06-2020",
                "appointment": "auxiliar"
            },

        ]
    },


    mutations: {
        [Constant.ADD_WORKER]: (state, payload) => {
            state.workerlist.push({ ...payload.workeritem, id: shortid.generate(), done: false });
            state.workeritem = {
                id: "",
                name: "",
                email: "",
                phone: "",
                address: "",
                date_active: "",
                appointment: "",
            };
        },
        [Constant.DELETE_WORKER]: (state, payload) => {
            let index = state.workerlist.findIndex((item) => item.id === payload.id);
            state.workerlist.splice(index, 1);
        },
        [Constant.TOGGLE_DONE]: (state, payload) => {
            let index = state.workerlist.findIndex((item) => item.id === payload.id);
            state.workerlist[index].done = !state.workerlist[index].done;
        },
        [Constant.UPDATE_WORKER]: (state, payload) => {
            let index = state.workerlist.findIndex((item) => item.id === payload.workeritem.id);
            state.workerlist[index] = payload.workeritem;
        },
        [Constant.INITIALIZE_WORKERITEM]: (state, payload) => {
            if (payload && payload.workeritem) {
                state.workerlist = payload.workerlist;
            } else {
                state.workerlist = {
                    id: "",
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    date_active: "",
                    appointment: "",
                };
            }
        },
    },
    actions: {  
        [Constant.ADD_WORKER]: (store/* , payload */) => {


           
         return new Promise((resolve, reject) => {
            WorkerService.getAll()
                    .then((comments) => {
                        console.log(comments.data)
                        store.commit(Constant.ADD_WORKER, comments.data);
                        resolve(comments)
                    })
                    .catch((err) => reject(err))
                })
            


        },
        [Constant.DELETE_WORKER]: (store, payload) => {
            store.commit(Constant.DELETE_WORKER, payload);
        },
        [Constant.TOGGLE_DONE]: (store, payload) => {
            store.commit(Constant.TOGGLE_DONE, payload);
        },
        [Constant.UPDATE_WORKER]: (store, payload) => {
            store.commit(Constant.UPDATE_WORKER, payload);
        }, 
        [Constant.INITIALIZE_WORKERITEM]: (store, payload) => {
            store.commit(Constant.INITIALIZE_WORKERITEM, payload);
        }
    },
    getters: {
        getWorkers(state) {
            return state.workerlist ;
        }
    }

}