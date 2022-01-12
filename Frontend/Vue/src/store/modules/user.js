import Constant from "../../Constant";
// import shortid from 'shortid';
import UserService from "@/services/UserService";
// import { useRouter } from "vue-router";

export const user = {
  namespaced: true,

  state: {
    authUser: {
      isAdmin: false,
      isWorker: false,
     },
  },
  mutations: {
    [Constant.LOGIN_USER]: (state, payload) => {
      payload.data.user.appointment = "auxiliar";
      console.log(payload.data.user);
      state.user = payload.data.user;
      localStorage.setItem("user", JSON.stringify(payload.data.user));
      localStorage.token = payload.data.access_token;
      state.authUser.isWorker = true;
      state.authUser.isAdmin = false;

      console.log();
    },
    [Constant.REGISTER_USER]: (state, payload) => {
      alert("estaria per fer");
      state.data = payload;
    },
    [Constant.LOGIN_ADMIN]: (state, payload) => {
      console.log(payload.user);
      localStorage.token = payload.user.token;

      state.user = payload.user;
      state.authUser.isAdmin = true;
      state.authUser.isWorker = false;

      /* OJO! Guardar el user como "JSON.stringify para luego con JSON.parse poder obtenerlo nuevamente como JSON"
      Sino lo devuelve como Objeto, de esta forma se facilita su tratamiento de datos
       */
      localStorage.setItem("user", JSON.stringify(payload.user));
    },
    [Constant.USER_REMOVE]: (state, payload) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = "";
      state.authUser.isAdmin = false;
      state.authUser.isWorker = false;
    },
    [Constant.UPDATE_AUTH]: (state, payload) => {
      console.log(payload.authUserLocal);
      state.authUser.isAdmin = payload.authUserLocal.isAdmin;
      state.authUser.isWorker = payload.authUserLocal.isWorker;
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

      UserService.loginGo(payload.dataUser)
        .then(function (user) {
          console.log(user.data);
          store.commit(Constant.LOGIN_ADMIN, user.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    [Constant.USER_REMOVE]: (store, payload) => {
      store.commit(Constant.USER_REMOVE, payload);
    },
    [Constant.UPDATE_AUTH]: (store, payload) => {
      store.commit(Constant.UPDATE_AUTH, payload);
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },

    /* Este getter es para mostrar el header en su propio componente */
    getAuthUsers(state) {
      return state.authUser;
    },
    /* Este getter es para GuardAuths */

    isAuthWorker: (state) => {
      try {
        let appointment = JSON.parse(localStorage.getItem("user")).appointment;
        let isAdmin =
          appointment == "gerente" || appointment == "auxiliar" ? true : false;
        return isAdmin;
      } catch {
        return false;
      }
    },

    isAuthAdim(state) {
      try {

      let appointment = JSON.parse(localStorage.getItem("user")).appointment;
        let isAdmin =
          appointment == "gerente" ? true : false;
        return isAdmin;
    
      } catch {
        return false;
      }
    },

    /* Este getter es para GuardAuths */

    checkAdmin: (state) => {
      console.log("entra")
      if (localStorage.token) {
        UserService.checkAdmin()
          .then(function (user) {
            console.log("entraUser!")
            console.log(user.data.user)
            user = user.data.user;
            localStorage.token = user.token;

            state.user = user;

            state.authUser.isAdmin = true;
            state.authUser.isWorker = false;
            console.log("deuria de ser true")
            return true;
          })
          .catch(function (error) {
            state.authUser.isAdmin = false;
            state.authUser.isWorker = false;
            console.log("error!!!")
            return false;
          });
      } else {
        return false;
      }
    },
  },
};
