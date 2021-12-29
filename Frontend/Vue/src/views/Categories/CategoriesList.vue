<template>
  <div style="mt-2">
    <div class="row">
      <div class="col p-3">
        <router-link class="btn btn-danger" to="/categories/add">Crea una categoria</router-link>
      </div>
    </div>
    <div class="card card-default card-borderless">
      <div class="card-body">
        <div class="row">
          <div class="col">
            <ul class="list-group">
              <CategoriesItem
                v-for="categoryitem in state.categorieslist"
                :key="categoryitem.id"
                :categoryitem="categoryitem"
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
