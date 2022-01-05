<template>    
    <tr>
        <td>{{ categoryitem.id }}</td>
        <td>{{ categoryitem.name }}</td>
        <td>
            <span class="badge badge-secondary pointer ml-1 text-danger" @click.stop="viewCategory(categoryitem.id)"> View </span>
            <span class="badge badge-secondary pointer ml-1 text-danger" @click.stop="editCategory(categoryitem.id)"> Edit </span>
            <span class="badge badge-secondary pointer ml-1 text-danger" @click.stop="deleteCategory(categoryitem.id)" >Delete</span>
        </td>
    </tr>
</template>

<script>
    import Constant from "../Constant";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    export default {
        props: {
            categoryitem: Object,
        },

        setup() {
            const store = useStore();
            const router = useRouter();

            const deleteCategory = (id) => {
                store.dispatch("categories/"+Constant.DELETE_CATEGORIES, { id });
            };

            const editCategory = (id) => {
                router.push({ name: "updateCategory", params: { id } });
            };

            const viewCategory = (id) => {
                router.push({ name: "viewCategory", params: { id } });
            };

            return { deleteCategory, editCategory, viewCategory };
        },
    };
</script>

<style></style>
