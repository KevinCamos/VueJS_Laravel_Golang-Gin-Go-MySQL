<template>
  <div class="card col-1 m-3" style="width: 18rem">
    <img
      class="card-img-top m-1"
      src="https://offloadmedia.feverup.com/valenciasecreta.com/wp-content/uploads/2021/03/11054825/coca-cola-valencia-1024x512.jpg"
      alt="Card image cap"
    />
    <div class="card-body">
      <h5 class="card-title">{{ productitem.name }}</h5>
      <p class="card-text">{{ productitem.description }}</p>
      <span @click="decrement">
      <button
        class="btn btn-outline-danger"
        @click="this.$emit('decrement-count')"
      >
        -
      </button></span>
      {{ state.mount }}
      <span @click="increment">

      <button
        class="btn btn-outline-success"
        @click="this.$emit('increment-count')"
      >
        +
      </button>
      </span>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  props: {
    /*  name: String,
    description: String, */
    productitem: Object,

    // mount: Number
  },
  emits: ["decrement-count", "increment-count"],
  setup() {
    var mount = 0;
    const state = reactive({
      mount: mount,
    });

    const increment = () => {
      state.mount++;
      console.log(state.mount);
      // this.$emit("increment-count");
    };

    const decrement = () => {
      if (state.mount > 0) state.mount--;
      // this.$emit("decrement-count");
    };
    return { state, increment, decrement };
  },
};
</script>

<style></style>
