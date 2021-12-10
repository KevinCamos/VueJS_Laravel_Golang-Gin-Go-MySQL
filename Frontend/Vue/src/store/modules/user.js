import Constant from '../../Constant';
// import shortid from 'shortid';
import UserService from '@/services/UserService'

export const user = {
    namespaced: true,
    state: {

    },
    mutations: {
        [Constant.LOGIN_USER]: (state, payload) => {
            console.log(payload.data.access_token)
            localStorage.token = payload.data.access_token;
            console.log(localStorage.token)
        },
        [Constant.REGISTER_USER]: (state, payload) => {
            console.log(payload)
            state.data = payload;
        }
    },
    actions: {
        [Constant.LOGIN_USER]: (store, payload) => {
            UserService.login(payload.dataUser)
            .then(function (data) {
                console.log(data.data)
                store.commit(Constant.LOGIN_USER, data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        [Constant.REGISTER_USER]: (store, payload) => {
            console.log(payload.dataUser)
            UserService.register(payload.dataUser)
            .then(function (data) {
                console.log(data.data)
                store.commit(Constant.REGISTER_USER, data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
        },
    },
    getters: {
    }

}