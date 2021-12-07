<template>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
        <h1 class="navbar-brand starbarstitle">STARBARS</h1>
        <button class="navbar-toggler" type="button" @click="changeIsNavShow">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div :class="navClass">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/home">Homes</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/about">About</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/workers">Trabajadores</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/products">Products</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/signin">Sign in</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/signup">Sign up</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
    setup() {
        const state = reactive({
            isNavShow: false
        })
        const navClass = computed(() => state.isNavShow ? "collapse navbar-collapse show" : "collapse navbar-collapse")
        const changeIsNavShow = () => {
            state.isNavShow = !state.isNavShow;
        } 
        
        return { state, changeIsNavShow, navClass };
    }
}
</script>

<style>
.starbarstitle{

  padding-left: 5%;

}
</style>