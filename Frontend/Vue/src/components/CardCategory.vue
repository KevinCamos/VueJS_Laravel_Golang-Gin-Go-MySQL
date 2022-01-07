<template>
  <div class="card col-4 m-5" style="width: 18rem">
    <img
      class="card-img-top m-1"
v-bind:src="categoryitem.image"
      alt="Card image cap"
    />
    <div class="card-body">
      <h5 class="card-title">{{ uppercase(categoryitem.name) }}</h5>
      <p class="card-text">{{ categoryitem.description }}</p>
      <button class="btn btn-danger" @click="this.$emit('clickToggle')">
        Escoger
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /*  name: String,
    description: String, */
    categoryitem: Object,

    // qty: Number
  },
  emits: ["clickToggle"],
  setup() {
    const uppercase = (text) => {
      return text.charAt(0).toUpperCase() + text.slice(1);
    };
    return { uppercase };
  },
};
</script>

<style></style>
