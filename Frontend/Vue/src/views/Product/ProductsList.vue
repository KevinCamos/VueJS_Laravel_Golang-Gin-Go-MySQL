<template>
      <div class="container-lg m-5">
        <div class="table-wrapper">

            <div class="table-title">
                <div class="row">
                    <div class="col-sm-8"><h2>Products <b>Lists</b></h2></div>
                    <div class="col-sm-4">
                        <div class="row">
                            <router-link class="col-6 btn btn-danger" to="/products/add">Add New</router-link>
                            <div class="search-box col-6">
                                <input type="text" class="form-control" placeholder="Search&hellip;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Catgory</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <ProductsItem
                        v-for="productitem in state.productslist"
                        :key="productitem.id"
                        :productitem="productitem"
                    />
                </tbody>
            </table>
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
