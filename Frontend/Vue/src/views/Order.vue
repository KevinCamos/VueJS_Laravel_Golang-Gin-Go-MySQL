<template>
  <section >
    <div  v-if="state.toggle1 == false  && state.toggle2 ==false"  class="row justify-content-center"> 
    <div class="card col-6 m-5" style="width: 18rem">
      <img
        class="card-img-top m-1"
        src="https://offloadmedia.feverup.com/valenciasecreta.com/wp-content/uploads/2021/03/11054825/coca-cola-valencia-1024x512.jpg"
        alt="Card image cap"
      />
      <div class="card-body">
        <h5 class="card-title">Bebidas</h5>
        <p class="card-text">Elegir entre las bebidas</p>
        <button
          class="btn btn-primary"
          @click="clickToggle(state.toggle1, 'bebida')"
        >
          Escoger {{ state.toggle1 }}
        </button>
      </div>
    </div>
    <div class="card col-6 m-5" style="width: 18rem">
      <img
        class="card-img-top m-1"
        src="https://www.hogarmania.com/archivos/202001/karl6505-bocadillo-de-pollo-y-calabacin-xl-1280x720x80xX.jpg"
        alt="Card image cap"
      />
      <div class="card-body">
        <h5 class="card-title">Bocadillo</h5>
        <p class="card-text">Elegir entre los bocadillos</p>
        <button
          class="btn btn-primary"
          @click="clickToggle(state.toggle2, 'bocadillo')">
          Escoger
        </button>
      </div>
    </div>
    </div>
    <div v-if="state.toggle1 == true" class="d.none">
      <button type="button" class="btn btn-info"  @click="clickToggle(false,false)">Retroceder</button>
      <Card-Product name="kevin" description="desc"></Card-Product>
    </div>
    <div v-if="state.toggle2 == true" class="d.none">
      <button type="button" class="btn btn-info" @click="clickToggle(false,false)">Retroceder</button>
      <Card-Product name="kevin" description="desc"></Card-Product>
    </div>
  </section>
</template>
<script>
import CardProduct from "../components/CardProduct.vue";
import { reactive, computed } from "vue";
// import { useStore } from "vuex";

export default {
  components: { CardProduct },

  setup() {

    const state = reactive({
      toggle1: false,
      toggle2: false,
    });
    const clickToggle = (toggle, type) => {
      state.toggle1 = type === "bebida" ? !toggle : false;
      state.toggle2 = type === "bocadillo" ? !toggle : false;
    };

    // const store = useStore();

    // const state = reactive({
    //   user: computed(() => store.getters["user/getUser"]),

    // });

    // console.log(state.user);

    // if (state.user){
    //     console.log("eh")
    // }
    return { state, clickToggle };
  },
};
</script>

<style></style>
