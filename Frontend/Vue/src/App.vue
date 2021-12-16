<template>
  <div class="container-fluid my-container">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";
// import Constant from "./Constant";
// import { useStore } from "vuex";

export default {
  components: { Header },
  // setup() {
  //   const store = useStore();
  //   store.dispatch("user/" + Constant.USER_STORAGE);
  //   return {};
  // },
};
</script>
<style>
.my-container {
  padding-right: 0;
  padding-left: 0;
}
</style>
