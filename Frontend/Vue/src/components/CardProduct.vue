<template>
  <div v-if="card === true" class="card col-3 m-3" style="width: 18rem">
    <img
      class="card-img-top m-1 img-thumbnail"
      v-bind:src="productitem.image"
      alt="Card image cap"
    />

    <div class="card-body">
      <h5 class="card-title" :order="order">{{ productitem.name }}</h5>
      <h5 class="card-title" :order="order">{{ productitem.price }}€</h5>
      <p class="card-text">{{ productitem.description }}</p>
      <button class="btn btn-outline-danger" @click="decrement(this)">-</button>
      {{ state.qty }}

      <button class="btn btn-outline-success" @click="increment(this)">
        +
      </button>
    </div>
  </div>

    <tr v-else-if="state.qty > 0 " >
      <td >{{ productitem.id }}</td>
      <td>{{ productitem.name }}</td>
      <td>{{ productitem.price }}€</td>
      <td @click="decrement(this)" class="rest">-</td>
      <td>{{ state.qty }}</td>
      <td @click="increment(this)" class="sum">+</td>
      <td>{{ state.qty * productitem.price }}€</td>
    </tr>
</template>

<script>
import { reactive } from "vue";
export default {
  props: {
    productitem: Object,
    order: Object,
    card: Boolean,
  },
  emits: ["decrement-count", "increment-count"],
  setup(props) {
    // console.log(props.order[0].id_product)
    // console.log(props.productitem.id)

    let product = props.order.filter(function (product) {
      if (props.productitem.id === product.id_product) return product;
    });

    let qty = product.length === 0 ? 0 : product[0].qty;
    //  var qty = 0
    const state = reactive({
      qty: qty,
    });
    // console.log(props.order);
    if (state.productfilter) {
      state.productfilter = state.productslist.filter(function (product) {
        if (product.category === type) return product;
      });
    }
    const decrement = (varThis) => {
      varThis.$emit("decrement-count");
      if (state.qty > 0) state.qty--;
    };
    const increment = (varThis) => {
      varThis.$emit("increment-count");
      state.qty++;
    };

    return { state, decrement, increment };
  },
};
</script>

<style>
tr:hover {
  cursor: pointer;
}
.sum:hover {
  background-color: rgb(144, 238, 144);
  color: green;
}
.rest:hover {
  background-color: #ff8080;
  color: darkred;
}
</style>
