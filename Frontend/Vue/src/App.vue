<template>
  <div class="container-fluid my-container">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  components  : { Header }
}
</script>

<style>
.my-container{
    padding-right:0;
    padding-left: 0;
}

</style>