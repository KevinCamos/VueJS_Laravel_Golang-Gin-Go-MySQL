<template>
  <li v-bind:class="'m-2 list-group-item bg-secondary text-white'">
    <span class="m-1 btn btn-primary rounded-circle"> X </span>
    <span class="m-5">       Cargando mesas
 </span>
    <button type="button" v-bind:class="'m-1 btn btn-dark'">
      Cargando mesas
    </button>
  </li>
</template> 

<script>
export default {};
</script>

<style>
.circle {
  background-color: darkseagreen;
}
</style>
