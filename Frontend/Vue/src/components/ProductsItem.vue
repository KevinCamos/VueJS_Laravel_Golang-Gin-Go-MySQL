<template>
    <tr>
        <td>{{ productitem.id }}</td>
        <td>{{ productitem.name }}</td>
        <td>
            <span class="badge badge-secondary pointer ml-1 text-danger" @click.stop="viewProduct(productitem.id)"> View </span>
            <span class="badge badge-secondary pointer ml-1 text-danger" @click.stop="editProduct(productitem.id)"> Edit </span>
            <span class="badge badge-secondary pointer ml-1 text-danger" @click.stop="deleteProduct(productitem.id)" > Delete </span>
        </td>
    </tr>
</template>

<script>
    import Constant from "../Constant";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    export default {
        props: {
            productitem: Object,
        },

        setup() {
            const store = useStore();
            const router = useRouter();

            const deleteProduct = (id) => {
                store.dispatch("products/"+Constant.DELETE_PRODUCTS, { id });
            };

            const editProduct = (id) => {
                router.push({ name: "updateProduct", params: { id } });
            };

            const viewProduct = (id) => {
                router.push({ name: "viewProduct", params: { id } });
            };

            return { deleteProduct, editProduct, viewProduct };
        },
    };
</script>

<style></style>
