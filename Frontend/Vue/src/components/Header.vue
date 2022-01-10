<template>
  <nav class="navbar navbar-expand-md bg-danger navbar-dark">
    <h1 class="navbar-brand starbarstitle mb-1">STARBARS</h1>
    <button class="navbar-toggler" type="button" @click="changeIsNavShow">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div :class="navClass">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/home">Homes</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
        </li>
        <li v-if="state.authUser.isAdmin === true" class="nav-item">
          <router-link class="nav-link" to="/products">Products</router-link>
        </li>
        <li v-if="state.authUser.isAdmin === true" class="nav-item">
          <router-link class="nav-link" to="/categories">Categories</router-link>
        </li>
        <li v-if="state.authUser.isAdmin === true" class="nav-item">
          <router-link class="nav-link" to="/workers">Trabajadores</router-link>
        </li>
        <li v-if="state.authUser.isAdmin === true || state.authUser.isWorker === true" class="nav-item">
          <router-link class="nav-link" to="/table">Mesas</router-link>
        </li>
        <li v-if="state.authUser.isAdmin === true || state.authUser.isWorker === true" class="nav-item">
          <router-link class="nav-link" to="/pedido/order">Realizar Pedido</router-link>
        </li>
        <li v-if="state.authUser.isAdmin === true || state.authUser.isWorker === true" class="nav-item">
          <router-link class="nav-link" to="/orders">Ver Pedidos</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
        <li v-if="state.authUser.isAdmin === false && state.authUser.isWorker === false" class="nav-item">
          <router-link class="nav-link" to="/signin">Sign in</router-link>
        </li>
        <li v-if="state.authUser.isAdmin === false && state.authUser.isWorker === false" class="nav-item">
          <router-link class="nav-link" to="/signup">Sign up</router-link>
        </li>
        <li v-if="state.authUser.isAdmin === true || state.authUser.isWorker === true" class="nav-item">
          <router-link class="nav-link" to="/home" @click="logout">Log out</router-link >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { reactive, computed } from "vue";
// import store from "@/store";
import { useStore } from "vuex";
import Constant from "../Constant";

export default {
  setup() {
    const store = useStore();
    console.log(Constant.USER_REMOVE);
    const state = reactive({
      isNavShow: false,
      authUser: computed(() => store.getters["user/getAuthUsers"]),
      authUserLocal: {
        isAdmin: false,
        isWorker: false,
        // isClient: false,
      },
    });
    const navClass = computed(() =>
      state.isNavShow
        ? "collapse navbar-collapse show"
        : "collapse navbar-collapse"
    );
    const changeIsNavShow = () => {
      state.isNavShow = !state.isNavShow;
    };
    const logout = () => {
      store.dispatch("user/" + Constant.USER_REMOVE, {
        succes: true,
      });
    };
    /* COMPROBAMOS SUS PERMISOS AL RECARGAR LA PÁGINA */
    if (store.getters["user/isAuthAdim"]) state.authUserLocal.isAdmin = true;
    else if (store.getters["user/isAuthWorker"])
      state.authUserLocal.isWorker = true;

    store.dispatch("user/" + Constant.UPDATE_AUTH, {
      authUserLocal: state.authUserLocal,
    });

    return { state, changeIsNavShow, navClass, logout };
  },
};
</script>

<style>
.starbarstitle {
  padding-left: 5%;
}
</style>
