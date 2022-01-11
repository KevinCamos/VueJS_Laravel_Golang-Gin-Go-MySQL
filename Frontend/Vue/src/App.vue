<template>
  <div class="container-fluid my-container">
    <suspense>
      <template #default>
        <Header />
      </template>
      <template #fallback>
        <nav class="navbar navbar-expand-md bg-danger navbar-dark">
          <h1 class="navbar-brand starbarstitle mb-1">STARBARS</h1>
          <button class="navbar-toggler" type="button" @click="changeIsNavShow">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div :class="navClass">
            <ul class="navbar-nav">
              <li class="nav-item text-white">Cargando...</li>
            </ul>
          </div>
        </nav>
      </template>
    </suspense>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    Header: defineAsyncComponent(() => import("./components/Header")),
  },
};
</script>
<style>
.my-container {
  padding-right: 0;
  padding-left: 0;
}
</style>
