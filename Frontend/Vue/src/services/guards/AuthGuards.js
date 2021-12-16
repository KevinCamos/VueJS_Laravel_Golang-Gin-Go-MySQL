import store from "@/store";

export default {

  authGuardWorker(to, from, next) {
    if (store.getters["user/isAuthWorker"]) {
      next();
    } else {
      next("/home");
    }
  },
  authGuardAdmin(to, from, next) {

    if (store.getters["user/checkAdmin"]) {
      console.log("isAdmin");

      next();
    } else if (store.getters["user/isAuthWorker"]) {
      next("/home");
    } else {
      next("/signin");
    }
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
