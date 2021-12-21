<template>
  <section>
    <div v-if="state.toggle == false" class="row justify-content-center">
      <Card-Category
        v-for="category in categories"
        :key="category"
        @clickToggle="clickToggle(true, category.name)"
        :categoryitem="category"
      ></Card-Category>
    </div>
    <div v-else class="row justify-content-center">
      <button
        type="button"
        class="btn btn-outline-danger"
        @click="clickToggle(false, false)"
      >
        Retroceder
      </button>
      <Card-Product
        v-for="productitem in state.productfilter"
        :key="productitem.id"
        @increment-count="incrementOrder(productitem.id)"
        @decrement-count="decrementOrder(productitem.id)"
        :productitem="productitem"
      ></Card-Product>
    </div>
  </section>
</template>
<script>
import CardProduct from "../../components/CardProduct.vue";
import CardCategory from "../../components/CardCategory.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import Constant from "../../Constant";

export default {
  components: { CardProduct, CardCategory },

  setup() {
    const state = reactive({
      toggle: false,

      productslist: computed(() => store.getters["products/getProducts"]),
      productfilter: "",
    });
    const store = useStore();
    if (!state.productslist) {
      store.dispatch("products/" + Constant.INITIALIZE_PRODUCTS);
    }
    console.log(state.productslist);

    const categories = [
      {
        name: "bocadillo",
        description: "Elegir entre los bocadillos",
      },
      {
        name: "bebida",
        description: "Elegir entre las bebidas",
      },
    ];

    const clickToggle = (toggle, type) => {
      state.toggle = type ? true : false;
      state.productfilter = state.productslist.filter(function (product) {
        if (product.category === type) return product;
      });
      console.log(state.productfilter);
    };

    /* Vars for create the order */
    const order = [];
    var item;
    const incrementOrder = (id) => {
      item = order.filter(function (product) {
        if (product.id === id) return product;
      });
      console.log(item.length);
      if (item.length === 0) {
        item.id = id;
        item.mount = 1;
        order.push(item);
      } else {
        order.map(function (product) {
          if (product.id === id) product.mount++;
          return product;
        });
      }
      console.log(order);
    };

    const decrementOrder = (id) => {
      item = order.filter(function (product) {
        if (product.id === id) return product;
      });
      if (item.length > 0) {
        order.map(function (product) {
          if (product.id === id) {
            product.mount = product.mount > 0 ? product.mount - 1 : 0;
          }
          return product;
        });
      }
      console.log(order);
    };

    return { state, categories, clickToggle, incrementOrder, decrementOrder };
  },
};
</script>

<style></style>
