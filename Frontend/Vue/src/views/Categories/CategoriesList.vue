<template>
  <div class="container-lg m-5">
    <div class="table-wrapper">

      <div class="table-title">
          <div class="row">
              <div class="col-sm-8"><h2>Categories <b>Lists</b></h2></div>
              <div class="col-sm-4">
                  <div class="row">
                      <router-link class="col-6 btn btn-danger" to="/categories/add">Add New</router-link>
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
                  <th>Actions</th>
              </tr>
          </thead>
          <tbody>
            <CategoriesItem
              v-for="categoryitem in state.categorieslist"
              :key="categoryitem.id"
              :categoryitem="categoryitem"
            />
          </tbody>
      </table>
    </div>
  </div>     
</template>
<script>

import Constant from "../../Constant";
import CategoriesItem from "../../components/CategoriesItem.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";
// import { useRouter } from "vue-router";

export default {
  components: { CategoriesItem },
  setup() {
      const store = useStore();
      const state = reactive({
          categorieslist: computed(() => store.getters["categories/getCategories"]),
      });

      store.dispatch("categories/" + Constant.INITIALIZE_CATEGORIES);

      return { state };
  },
};
</script>

<style></style>
