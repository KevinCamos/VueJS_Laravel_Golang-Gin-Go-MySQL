<template>
    <div class="container">
        <div class="row">
            <div class="col p-3">
                <h2>Update product</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label htmlFor="image">Image:</label>
                    <input type="file" class="form-control" id="image" ref="image"/>
                </div>
                <div class="form-group">
                    <label htmlFor="name">Name :</label>
                    <input type="text" class="form-control" id="name" v-model="state.productsitemlocal.name" />
                </div>
                <div class="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" class="form-control" id="description" v-model="state.productsitemlocal.description" />
                </div>
                <div class="form-group">
                    <label htmlFor="category">Category :</label>
                    <select  id="category"  name="category" v-model="state.productsitemlocal.categories.id"
                    class="form-select"  aria-label="Default select example">
                        <option disabled value="" >Define la categoria</option>
                        <option v-for="category in state.categorieslist" :value="category.id"> {{ category.name }}</option>
                    </select>
                    <div>Categoria seleccionada: <b>{{ state.productsitemlocal.category }}</b></div>
                </div>
                <div class="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number" class="form-control" id="price" v-model="state.productsitemlocal.price" />
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-danger m-1" @click="updateProducts" > Update </button>
                    <button type="button" class="btn btn-danger m-1" @click="cancel">Cancel </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Constant from "../../Constant";
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ref } from 'vue';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const currentRoute = useRoute();
    const image = ref(null);

    //     const productsitem = store.state.products.productslist.find(
    //     (item) => item.id.toString() === currentRoute.params.id
    // );

    if (!store.state.products.productslist) {
      store.dispatch("products/" + Constant.INITIALIZE_PRODUCTS);
    }
    // console.log(productsitem);

    const state = reactive({
      productsitemlocal: {
        ...store.state.products.productslist.find(
          (item) => item.id.toString() === currentRoute.params.id
        ),
      },
      categorieslist: computed(() => store.getters["categories/getCategories"])
    });

    if (!state.categorieslist) {
      store.dispatch("categories/" + Constant.INITIALIZE_CATEGORIES);
    }

    const updateProducts = () => {
      router.push({ name: "productsList" });
      state.productsitemlocal.image = image.value.files[0] != undefined ? image.value.files[0] : null;
      store.dispatch("products/" + Constant.UPDATE_PRODUCTS, {
        productsitem: state.productsitemlocal,
      });
    };

    const cancel = () => {
      router.push({ name: "productsList" });
    };

    return { state, image, updateProducts, cancel };
  },
};
</script>

<style></style>
