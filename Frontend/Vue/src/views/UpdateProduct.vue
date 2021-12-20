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
                    <label htmlFor="name">Name :</label>
                    <input type="text" class="form-control" id="name" v-model="state.productsitemlocal.name" />
                </div>
                <div class="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" class="form-control" id="description" v-model="state.productsitemlocal.description" />
                </div>
                <div class="form-group">
                    <label htmlFor="category">Category :</label>
                    <select  id="category"  name="category" v-model="state.productsitemlocal.category"
                    class="form-select"  aria-label="Default select example">
                        <option disabled value="" >Define la categoria</option>

                        <option v-if="state.productsitemlocal.category==='bebida'" value="bebida">Bebida</option>
                        <option v-else value="bebida">Bebida</option>
                        <option v-if="state.productsitemlocal.category==='bocadillo'" value="bocadillo">Bocadillo</option>
                        <option v-else value="bocadillo">Bocadillo</option>
                        <!-- <option value="bocadillo">Bocadillo</option> -->
                    </select>
                    <div>Categoria seleccionada: <b>{{ state.productsitemlocal.category }}</b></div>
                </div>
                <div class="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number" class="form-control" id="price" v-model="state.productsitemlocal.price" />
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-primary m-1" @click="updateProducts" > Update </button>
                    <button type="button" class="btn btn-primary m-1" @click="cancel">Cancel </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Constant from "../Constant";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const currentRoute = useRoute();
    // console.log(store.state.products.productslist[0]);
    console.log(currentRoute.params.id);
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
    });

    const updateProducts = () => {
      router.push({ name: "productsList" });
      store.dispatch("products/" + Constant.UPDATE_PRODUCTS, {
        productsitem: state.productsitemlocal,
      });
    };

    const cancel = () => {
      router.push({ name: "productsList" });
    };

    return { state, updateProducts, cancel };
  },
};
</script>

<style></style>
