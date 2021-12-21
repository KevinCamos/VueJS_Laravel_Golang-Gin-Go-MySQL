<template>
  <div class="card col-1 m-3" style="width: 18rem">
    <img
      class="card-img-top m-1"
      src="https://offloadmedia.feverup.com/valenciasecreta.com/wp-content/uploads/2021/03/11054825/coca-cola-valencia-1024x512.jpg"
      alt="Card image cap"
    />
    <div class="card-body">
      <h5 class="card-title" :order="order">{{ productitem.name }}</h5>
      <p class="card-text">{{ productitem.description }}</p>
      <button class="btn btn-outline-danger" @click="decrement(this)">-</button>
      {{ state.mount }}

      <button class="btn btn-outline-success" @click="increment(this)">
        +
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  props: {
    productitem: Object,
    order: Object,
  },
  emits: ["decrement-count", "increment-count"],
   setup(props) {
    var mount 
      mount =  props.order.filter(function (product) {
        if (props.productitem.id === product.id) return product
              });
    
      mount = mount.length ===0? 0:mount[0].mount
    //  var mount = 0
     console.log(props.order)
    const state = reactive({
      mount: mount,
    });
    // console.log(props.order);
    if(state.productfilter ){
      state.productfilter = state.productslist.filter(function (product) {
        if (product.category === type) return product;
      });
}
    const decrement = (varThis) => {
      varThis.$emit("decrement-count");
      if (state.mount > 0) state.mount--;
    };
    const increment = (varThis) => {
      varThis.$emit("increment-count");
      state.mount++;
    };

    return { state, decrement, increment };
  },
};
</script>

<style></style>
