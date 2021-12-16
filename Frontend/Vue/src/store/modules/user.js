import Constant from "../../Constant";
// import shortid from 'shortid';
import UserService from "@/services/UserService";
// import { useRouter } from "vue-router";

export const user = {
  namespaced: true,
<<<<<<< HEAD
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
=======
  state: {
    authUser: {
      isAdmin: false,
      isWorker: false,
      // isClient: false,
    },
  },
  mutations: {
    [Constant.LOGIN_USER]: (state, payload) => {
      payload.data.user.appointment = "auxiliar";
      console.log(payload.data.user);
      state.user = payload.data.user;
      localStorage.setItem("user", JSON.stringify(payload.data.user));
      localStorage.token = payload.data.acces_token;
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
>>>>>>> features/vue/AuthGuards
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
<<<<<<< HEAD
      // console.log(payload)
      // console.log(payload.dataUser)
      UserService.loginGo(payload.dataUser)
        .then(function (user) {
          // const router = useRouter();
          // router.push({ name: "home" })

          console.log(user.data);
          store.commit(Constant.LOGIN_ADMIN, user.data);
          // resolve(workers)
=======
      UserService.loginGo(payload.dataUser)
        .then(function (user) {
          console.log(user.data);
          store.commit(Constant.LOGIN_ADMIN, user.data);
>>>>>>> features/vue/AuthGuards
        })
        .catch(function (error) {
          console.log(error);
        });
    },
<<<<<<< HEAD
=======
    [Constant.USER_REMOVE]: (store, payload) => {
      store.commit(Constant.USER_REMOVE, payload);
    },
    [Constant.UPDATE_AUTH]: (store, payload) => {
      store.commit(Constant.UPDATE_AUTH, payload);
    },
>>>>>>> features/vue/AuthGuards
  },
  getters: {
    getUser(state) {
      return state.user;
    },
<<<<<<< HEAD
    isAuthWorker: (state) => {
      try {
        let appointment = state.user.appointment;
=======
    /* Este getter es para mostrar el header en su propio componente */
    getAuthUsers(state) {
      return state.authUser;
    },
    /* Este getter es para GuardAuths */

    isAuthWorker: (state) => {
      try {
        let appointment = JSON.parse(localStorage.getItem("user")).appointment;
>>>>>>> features/vue/AuthGuards
        let isAdmin =
          appointment == "gerente" || appointment == "auxiliar" ? true : false;
        return isAdmin;
      } catch {
        return false;
      }
    },
<<<<<<< HEAD
    isAuthAdim: (state) => {
      try {
        let isAdmin = state.user.appointment == "gerente" ? true : false;
        return isAdmin;
      } catch {
=======
    /* Este getter es para GuardAuths */

    checkAdmin: (state) => {
      console.log("entra")
      if (localStorage.token) {
        UserService.checkAdmin(state.user)
          .then(function (user) {
            localStorage.token = user.token;

            state.user = user;

            state.authUser.isAdmin = true;
            state.authUser.isWorker = false;
            return true;
          })
          .catch(function (error) {
            state.authUser.isAdmin = false;
            state.authUser.isWorker = false;
            return false;
          });
      } else {
>>>>>>> features/vue/AuthGuards
        return false;
      }
    },
  },
};
