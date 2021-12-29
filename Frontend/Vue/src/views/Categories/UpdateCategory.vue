<template>
    <div class="container">
        <div class="row">
            <div class="col p-3">
                <h2>Update category</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" class="form-control" id="name" v-model="state.categoriesitemlocal.name" />
                </div>
                <div class="form-group">
                    <label htmlFor="image">Image:</label>
                    <input type="file" class="form-control" id="image" ref="image"/>
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-danger m-1" @click="updateCategory" > Update </button>
                    <button type="button" class="btn btn-danger m-1" @click="cancel">Cancel </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Constant from "../../Constant";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ref } from 'vue';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const currentRoute = useRoute();
    const image = ref(null);

    if (!store.state.categories.categorieslist) {
      store.dispatch("categories/" + Constant.INITIALIZE_CATEGORIES);
    }

    const state = reactive({
      categoriesitemlocal: {
        ...store.state.categories.categorieslist.find(
          (item) => item.id.toString() === currentRoute.params.id
        ),
      },
    });

    const updateCategory = () => {
      state.categoriesitemlocal.image = image.value.files[0] != undefined ? image.value.files[0] : null;
      store.dispatch("categories/" + Constant.UPDATE_CATEGORIES, {
        categoriesitem: state.categoriesitemlocal,
      });
      router.push({ name: "CategoriesList" });
    };

    const cancel = () => {
      router.push({ name: "CategoriesList" });
    };

    return { state, image, updateCategory, cancel };
  },
};
</script>

<style></style>
