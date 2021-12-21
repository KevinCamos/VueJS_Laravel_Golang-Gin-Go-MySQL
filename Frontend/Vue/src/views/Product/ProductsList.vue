<template>
  <div style="mt-2">
    <div class="row">
      <div class="col p-3">
        <router-link class="btn btn-danger" to="/products/add">Crea un producto</router-link>
      </div>
    </div>
    <div class="card card-default card-borderless">
      <div class="card-body">
        <div class="row">
          <div class="col">
            <ul class="list-group">
              <ProductsItem
                v-for="productitem in state.productslist"
                :key="productitem.id"
                :productitem="productitem"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Constant from "../../Constant";
import ProductsItem from "../../components/ProductsItem.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";
// import { useRouter } from "vue-router";

export default {
  components: { ProductsItem },
  setup() {
      const store = useStore();
      // const router = useRouter();
      const state = reactive({
          productslist: computed(() => store.getters["products/getProducts"]),
      });
      console.log(state.productslist);

      // if (!state.productslist) {
          store.dispatch("products/" + Constant.INITIALIZE_PRODUCTS);
      // }
      console.log(state);
      return { state };
  },
};
</script>

<style></style>
