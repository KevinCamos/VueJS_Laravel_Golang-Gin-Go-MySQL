<template>
<div class="container m-5">
    <div class="row h-100 justify-content-center align-items-center">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th colspan="3">      
                        <h3>{{ state.productsitemlocal.name }}</h3>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Id</th>
                    <td>{{ state.productsitemlocal.id }} </td>
                    <td rowspan="5" class="col-6"> 
                        <img class="w-75" v-bind:src="state.productsitemlocal.image">
                    </td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>{{ state.productsitemlocal.name }} </td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>{{ state.productsitemlocal.description }} </td>
                </tr>
                <tr>
                    <th>Category</th>
                    <td>{{ state.productsitemlocal.categories.name }} </td>
                </tr>
                <tr>
                    <th>Price</th>
                    <td>{{ state.productsitemlocal.price }} </td>
                </tr>
            </tbody>
        </table>
        <div class="form-group">
            <button type="button" class="btn btn-danger m-1" @click="editProduct(state.productsitemlocal.id)">Editar </button>
            <button type="button" class="btn btn-danger m-1" @click="deleteProduct(state.productsitemlocal.id   )">Elimanar </button>
            <button type="button" class="btn btn-danger m-1" @click="cancel">Volver </button>
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

        if (!store.state.products.productslist) {
            store.dispatch("products/" + Constant.INITIALIZE_PRODUCTS);
        }

        const state = reactive({
            productsitemlocal: {
                ...store.state.products.productslist.find(
                    (item) => item.id.toString() === currentRoute.params.id
                ),
            },
        });

        const deleteProduct = (id) => {
                store.dispatch("products/"+Constant.DELETE_PRODUCTS, { id });
        };

        const editProduct = (id) => {
            router.push({ name: "updateProduct", params: { id } });
        };

        const cancel = () => {
            router.push({ name: "productsList" });
        };

        return { state, cancel, deleteProduct, editProduct };
    },
};
</script>

<style></style>