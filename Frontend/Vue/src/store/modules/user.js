import Constant from "../../Constant";
// import shortid from 'shortid';
import UserService from "@/services/UserService";
// import { useRouter } from "vue-router";

export const user = {
  namespaced: true,
  state: {},
  mutations: {
    [Constant.LOGIN_USER]: (state, payload) => {
      // console.log(payload.data.access_token)
      localStorage.token = payload.data.access_token;
      state.user = payload.data;
      // console.log(localStorage.token)
    },
    [Constant.REGISTER_USER]: (state, payload) => {
      // console.log(payload)
      state.data = payload;
    },
    [Constant.LOGIN_ADMIN]: (state, payload) => {
      // console.log(payload.user)
      localStorage.token = payload.user.token;
      state.user = payload.user;

      // console.log(localStorage.token)
    },
  },

  actions: {
    [Constant.LOGIN_USER]: (store, payload) => {
      UserService.login(payload.dataUser)
        .then(function (data) {
          console.log(data.data);
          store.commit(Constant.LOGIN_USER, data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    [Constant.REGISTER_USER]: (store, payload) => {
      console.log(payload.dataUser);
      UserService.register(payload.dataUser)
        .then(function (data) {
          console.log(data.data);
          store.commit(Constant.REGISTER_USER, data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    [Constant.LOGIN_ADMIN]: (store, payload) => {
      // console.log(payload)
      // console.log(payload.dataUser)
      UserService.loginGo(payload.dataUser)
        .then(function (user) {
          // const router = useRouter();
          // router.push({ name: "home" })

          console.log(user.data);
          store.commit(Constant.LOGIN_ADMIN, user.data);
          // resolve(workers)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isAuthWorker: (state) => {
      try {
        let appointment = state.user.appointment;
        let isAdmin =
          appointment == "gerente" || appointment == "auxiliar" ? true : false;
        return isAdmin;
      } catch {
        return false;
      }
    },
    isAuthAdim: (state) => {
      try {
        let isAdmin = state.user.appointment == "gerente" ? true : false;
        return isAdmin;
      } catch {
        return false;
      }
    },
  },
};
