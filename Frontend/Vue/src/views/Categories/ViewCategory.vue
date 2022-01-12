<template>
<div class="container m-5">
    <div class="row h-100 justify-content-center align-items-center">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th colspan="3">      
                        <h3>{{ state.categoriesitemlocal.name }}</h3>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Id</th>
                    <td>{{ state.categoriesitemlocal.id }} </td>
                    <td rowspan="3" class="col-6"> 
                        <img class="w-75" v-bind:src="state.categoriesitemlocal.image">
                    </td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>{{ state.categoriesitemlocal.name }} </td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{{ state.categoriesitemlocal.status }} </td>
                </tr>
            </tbody>
        </table>
        <div class="form-group">
            <button type="button" class="btn btn-danger m-1" @click="editCategories(state.categoriesitemlocal.id)">Editar </button>
            <button type="button" class="btn btn-danger m-1" @click="deleteCategories(state.categoriesitemlocal.id   )">Elimanar </button>
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

        if (!store.state.categories.productslist) {
            store.dispatch("categories/" + Constant.INITIALIZE_CATEGORIES);
        }

        const state = reactive({
            categoriesitemlocal: {
                ...store.state.categories.categorieslist.find(
                    (item) => item.id.toString() === currentRoute.params.id
                ),
            },
        });

        const deleteCategories = (id) => {
                store.dispatch("categories/"+Constant.DELETE_CATEGORIES, { id });
        };

        const editCategories = (id) => {
            router.push({ name: "updateCategory", params: { id } });
        };

        const cancel = () => {
            router.push({ name: "CategoriesList" });
        };

        return { state, cancel, deleteCategories, editCategories };
    },
};
</script>

<style></style>