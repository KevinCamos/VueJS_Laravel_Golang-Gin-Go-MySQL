<template>
  <div class="card col-1 m-3" style="width: 18rem">
    <img
      class="card-img-top m-1"
      src="https://offloadmedia.feverup.com/valenciasecreta.com/wp-content/uploads/2021/03/11054825/coca-cola-valencia-1024x512.jpg"
      alt="Card image cap"
    />
    <div class="card-body">
      <h5 class="card-title">{{productitem.name}}</h5>
      <p class="card-text">{{productitem.description}}</p>
      <button class="btn btn-outline-danger" @click='this.$emit("decrement-count")'> - 

      </button>
      {{state.mount}}

      <button class="btn btn-outline-success"  @click='this.$emit("increment-count")'>+</button>
    </div>
  </div>


</template>

<script>
import { reactive } from "vue";
export default {
  props: {
   /*  name: String,
    description: String, */
    productitem: Object
    
    // mount: Number
  },
  emits: ["decrement-count","increment-count"],
  setup() {
      const state = reactive({
          mount:0
      })

      
    //  /*        const store = useStore();
    //         const router = useRouter();

    //         const deleteWork = (id) => {
    //             store.dispatch("products/"+Constant.DELETE_PRODUCTS, { id });
    //         };

    //         const editWork = (id) => {
    //             router.push({ name: "updateProduct", params: { id } });
    //         }; */

    return {state};
  },
};
</script>

<style></style>
