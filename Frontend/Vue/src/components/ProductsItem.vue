<template>
    <tr>
        <td>{{ productitem.id }}</td>
        <td>{{ productitem.name }}</td>
        <td><span v-bind:class="[ productitem.status === 'disable' ? 'badge bg-danger p-2 m-1' : 'badge bg-success p-2 m-1']" @click.stop="viewCategory(productitem.id)"> {{ productitem.status }} </span></td>
        <td>
            <span class="badge bg-primary pointer p-2 m-1" @click.stop="viewProduct(productitem.id)"> View </span>
            <span class="badge bg-success pointer p-2 m-1" @click.stop="editProduct(productitem.id)"> Edit </span>
            <span class="badge bg-warning  pointer p-2 m-1 text-dark" @click.stop="updateStatus(productitem.id, productitem.status)"> Edit status </span>
            <span class="badge bg-danger pointer p-2 m-1" @click.stop="deleteProduct(productitem.id)" > Delete </span>
        </td>
    </tr>
</template>

<script>
    import Constant from "../Constant";
    import { reactive } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    export default {
        props: {
            productitem: Object,
        },

        setup() {
            const store = useStore();
            const router = useRouter();
            const state = reactive({
                products:{
                    status: "disable",
                }
            });
            const deleteProduct = (id) => {
                store.dispatch("products/"+Constant.DELETE_PRODUCTS, { id });
            };

            const editProduct = (id) => {
                router.push({ name: "updateProduct", params: { id } });
            };

            const viewProduct = (id) => {
                router.push({ name: "viewProduct", params: { id } });
            };

            const updateStatus = (id, status) => {
                state.products.status = status === "disable" ? "active" : "disable";
                store.dispatch("products/" + Constant.UPDATE_STATUS_PRODUCTS, {
                    products: state.products,
                    id
                });
            };

            return { deleteProduct, editProduct, viewProduct, updateStatus };
        },
    };
</script>

<style></style>
