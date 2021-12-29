<template>

    <li class="list-group-item">
        <span :class="{ pointer: true, 'todo-done': productitem.active }" 
            :title="'Explanation : ' + productitem.name" :id="productitem.id">
            {{ productitem.name }}
        </span>
        <img v-bind:src="productitem.image">
        <div class="float-right">
            <span class="badge badge-secondary pointer ml-1 text-danger" @click.stop="editWork(productitem.id)"> Edit </span>
            <span class="badge badge-secondary pointer ml-1 text-danger" @click.stop="deleteWork(productitem.id)" >Delete</span>
        </div>
    </li>
    
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

            const deleteWork = (id) => {
                store.dispatch("products/"+Constant.DELETE_PRODUCTS, { id });
            };

            const editWork = (id) => {
                router.push({ name: "updateProduct", params: { id } });
            };

            return { deleteWork, editWork };
        },
    };
</script>

<style></style>
