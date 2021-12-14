import store from "@/store";

export default {

     authGuardWorker(to, from, next) {
        console.log(store.getters["user/isAuthWorker"]);
        if (store.getters["user/isAuthWorker"]) {
          console.log("isWorker");
      
          next();
        } else {
            next("/home");
        }
      },
       authGuardAdmin(to, from, next) {
        console.log(store.getters["user/isAuthAdim"]);

        if (store.getters["user/isAuthAdim"]) {
            console.log("isAdmin");

          next();
        } else {
          next("/home");
        }
      },
      noAuth(to, from, next) {
        console.log(!store.getters["user/isAuthWorker"]);

        if (!store.getters["user/isAuthWorker"]) {
          next();
        } else {
          next("/home");
        }
      }
      
}
