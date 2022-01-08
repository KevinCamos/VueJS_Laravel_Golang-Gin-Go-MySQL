import store from "@/store";
import UserService from "@/services/UserService";

export default {

  authGuardWorker(to, from, next) {
    if (store.getters["user/isAuthWorker"]) {
      next();
    } else {
      next("/home");
    }
  },
  authGuardAdmin(to, from, next) {
    store.dispatch("order/" + Constant.INITIALIZE_ORDER);
    store.dispatch("products/" + Constant.INITIALIZE_ORDER);
    UserService.checkAdmin()
    .then(function (user) {
      user = user.data.user;
      localStorage.token = user.token;
      localStorage.setItem("user", JSON.stringify(user));
      next();;
    })
    .catch(function (error) {
      store.state.authUser.isAdmin = false;
      store. state.authUser.isWorker = false;
      console.log("error!!!")
      next("/signin");
    });
/*     if (store.getters["user/checkAdmin"]) {
      console.log("isAdmin");

      next();
    } else if (store.getters["user/isAuthWorker"]) {
      next("/home");
    } else {
      next("/signin");
    } */
  },
  noAuth(to, from, next) {
    console.log(!store.getters["user/isAuthWorker"]);

    if (!store.getters["user/isAuthWorker"]) {
      next();
    } else {
      next("/home");
    }
  },


};
