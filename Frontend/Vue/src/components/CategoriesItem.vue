<template>

    <li class="list-group-item">
        <span :class="{ pointer: true, 'todo-done': categoryitem.active }" 
            :title="'Explanation : ' + categoryitem.name" :id="categoryitem.id">
            {{ categoryitem.name }}
        </span>
        <img v-bind:src="categoryitem.image">
        <div class="float-right">
            <span class="badge badge-secondary pointer ml-1 text-danger" @click.stop="editCategory(categoryitem.id)"> Edit </span>
            <span class="badge badge-secondary pointer ml-1 text-danger" @click.stop="deleteCategory(categoryitem.id)" >Delete</span>
        </div>
    </li>
    
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

            return { deleteCategory, editCategory };
        },
    };
</script>

<style></style>
