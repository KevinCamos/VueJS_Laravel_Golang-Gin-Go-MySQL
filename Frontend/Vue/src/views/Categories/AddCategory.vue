<template>
    <div class="container">
        <div class="row">
            <div class="col p-3">
                <h2>Add categoria</h2>
            </div>
            </div>
            <div class="row">
            <div class="col">
                <div class="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" class="form-control" id="name" v-model="state.categoriesitemlocal.name" />
                </div>
                <div class="form-group">
                    <label htmlFor="image">Image:</label>
                    <input type="file" class="form-control" id="image" ref="image"/>
                </div>
                <div class="form-group mt-2">
                    <button type="button" class="btn btn-danger m-1" @click="addCategory"> Add </button>
                    <button type="button" class="btn btn-danger m-1" @click="cancel"> Cancel </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Constant from "../../Constant";
    import CategoriesService from '@/services/CategoriesService'
    import { reactive } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    import { ref } from 'vue';

    export default {
        setup() {
            const store = useStore();
            const router = useRouter();
            const state = reactive({
                categoriesitemlocal: {
                    name: "",
                    image: "",
                }
            });
            const image = ref(null)
            
            const addCategory = () => {
                if (state.categoriesitemlocal.name.trim().length >= 2) {
                    state.categoriesitemlocal.image = image.value.files[0] != undefined ? image.value.files[0] : null;

                    store.dispatch("categories/"+Constant.ADD_CATEGORIES, {
                        categoriesitem: state.categoriesitemlocal
                    });
                    router.push({ name: "CategoriesList" });
                } else {
                    alert("Please enter a to-do in at least 2 characters");
                }
            };

            const cancel = () => {
                router.push({ name: "CategoriesList" });
            };

            return { state, image, addCategory, cancel };
        },
    };
</script>

<style></style>
