<template>    
    <tr>
        <td>{{ categoryitem.id }}</td>
        <td>{{ categoryitem.name }}</td>
        <td><span v-bind:class="[ categoryitem.status === 'disable' ? 'badge bg-danger p-2 m-1' : 'badge bg-success p-2 m-1']" @click.stop="viewCategory(categoryitem.id)"> {{ categoryitem.status }} </span></td>
        <td>
            <span class="badge bg-primary p-2 m-1" @click.stop="viewCategory(categoryitem.id)"> View </span>
            <span class="badge bg-success p-2 m-1" @click.stop="editCategory(categoryitem.id)"> Edit </span>
            <span class="badge bg-warning  p-2 m-1 text-dark" @click.stop="updateStatus(categoryitem.id, categoryitem.status)"> Edit status </span>
            <span class="badge bg-danger p-2 m-1" @click.stop="deleteCategory(categoryitem.id)" >Delete</span>
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
            categoryitem: Object,
        },

        setup() {
            const store = useStore();
            const router = useRouter();
            const state = reactive({
                categories:{
                    status: "disable",
                }
            });
            const deleteCategory = (id) => {
                store.dispatch("categories/"+Constant.DELETE_CATEGORIES, { id });
            };

            const editCategory = (id) => {
                router.push({ name: "updateCategory", params: { id } });
            };

            const viewCategory = (id) => {
                router.push({ name: "viewCategory", params: { id } });
            };

            const updateStatus = (id, status) => {
                state.categories.status = status === "disable" ? "active" : "disable";

                store.dispatch("categories/" + Constant.UPDATE_STATUS_CATEGORIES, {
                    categories: state.categories,
                    id
                });
            };

            return { deleteCategory, editCategory, viewCategory, updateStatus };
        },
    };
</script>

<style></style>
