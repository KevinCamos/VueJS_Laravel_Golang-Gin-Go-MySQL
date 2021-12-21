<template>
    <div class="container">
        <div class="row">
            <div class="col p-3">
                <h2>Add producto</h2>
            </div>
            </div>
            <div class="row">
            <div class="col">
                <div class="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" class="form-control" id="name" v-model="state.productsitemlocal.name" />
                </div>
                <div class="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" class="form-control" id="description" v-model="state.productsitemlocal.description" />
                </div>
          <!--       <div class="form-group">
                    <label htmlFor="category">Category:</label>
                    <input type="text" class="form-control" id="category" v-model="state.productsitemlocal.category" />
                </div>
 -->
                <div class="form-group">
                    <label htmlFor="category">Category :</label>
                    <select  id="category"  name="category" v-model="state.productsitemlocal.category"
                    class="form-select"  aria-label="Default select example">
                        <option disabled value="" selected>Define la categoria</option>
                        <option value="bebida">Bebida</option>
                        <option value="bocadillo">Bocadillo</option>
                    </select>
                    <div>Categoria seleccionada: <b>{{ state.productsitemlocal.category }}</b></div>
        </div>

                <div class="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number" class="form-control" id="price" v-model="state.productsitemlocal.price" />
                </div>
                <div class="form-group mt-2">
                    <button type="button" class="btn btn-danger m-1" @click="addProduct"> Add </button>
                    <button type="button" class="btn btn-danger m-1" @click="cancel"> Cancel </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Constant from "../../Constant";
    import { reactive } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    export default {
        setup() {
            const store = useStore();
            const router = useRouter();
            const state = reactive({
                productsitemlocal: {
                    name: "",
                    description: "",
                    category: "",
                    price: "",
                }
            });

            const addProduct = () => {
            /* Aquí van las validaciones  */
                if (state.productsitemlocal.name.trim().length >= 2) {
                    store.dispatch("products/"+Constant.ADD_PRODUCTS, {
                        productsitem: state.productsitemlocal,
                    });
                    router.push({ name: "productsList" });
                } else {
                    alert("Please enter a to-do in at least 2 characters");
                }
            };

            const cancel = () => {
                router.push({ name: "productsList" });
            };

            return { state, addProduct, cancel };
        },
    };
</script>

<style></style>
