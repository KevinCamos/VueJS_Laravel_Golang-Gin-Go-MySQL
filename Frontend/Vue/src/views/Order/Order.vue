<template>
  <section>
    <div v-if="state.toggle == false" class="row justify-content-center">
      <Card-Category
        v-for="category in categories"
        :key="category"
        @clickToggle="clickToggle(true, category.id)"
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
        :order="order"
      ></Card-Product>
    </div>

    <div class="row justify-content-center">
      <button
        type="button"
        class="btn btn-outline-success position-sticky bottom-0"
        @click="sendOrder()"
      >
        Tomar Pedido
      </button>
    </div>
  </section>
</template>
<script>
import CardProduct from "../../components/CardProduct.vue";
import CardCategory from "../../components/CardCategory.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import Constant from "../../Constant";

export default {
  components: { CardProduct, CardCategory },

  setup() {
    const router = useRouter();

    const state = reactive({
      toggle: false,

      productslist: computed(() => store.getters["products/getProducts"]),
      orderlist: computed(() => store.getters["order/getOrder"]),
      productfilter: "",
    });
    const store = useStore();
    if (!state.productslist) {
      store.dispatch("products/" + Constant.INITIALIZE_PRODUCTS);
    }
    const categories = [
      {
        id: "1",
        name: "Pizza",
        description: "Elegir entre las pizzas",
        image:
          "https://offloadmedia.feverup.com/valenciasecreta.com/wp-content/uploads/2021/03/11054825/coca-cola-valencia-1024x512.jpg",
      },
      {
        id: "2",
        name: "Bebida",
        description: "Elegir entre las bebidas",
        image:
          "https://offloadmedia.feverup.com/valenciasecreta.com/wp-content/uploads/2021/03/11054825/coca-cola-valencia-1024x512.jpg",
      },
      {
        id: "3",
        name: "Postres",
        description: "Elegir entre los postres",
        image:
          "https://offloadmedia.feverup.com/valenciasecreta.com/wp-content/uploads/2021/03/11054825/coca-cola-valencia-1024x512.jpg",
      },
      {
        id: "4",
        name: "Entrantes",
        description: "Elegir entre los entrates",
        image:
          "https://offloadmedia.feverup.com/valenciasecreta.com/wp-content/uploads/2021/03/11054825/coca-cola-valencia-1024x512.jpg",
      },
      {
        id: "5",
        name: "Sándwiches",
        description: "Elegir entre los sándwiches",
        image:
          "https://offloadmedia.feverup.com/valenciasecreta.com/wp-content/uploads/2021/03/11054825/coca-cola-valencia-1024x512.jpg",
      },
      {
        id: "6",
        name: "Ensaladas",
        description: "Elegir entre las ensaladas",
        image:
          "https://offloadmedia.feverup.com/valenciasecreta.com/wp-content/uploads/2021/03/11054825/coca-cola-valencia-1024x512.jpg",
      },
    ];

    /* Vars for create the order */
    const thisRouteValue = router.currentRoute._value.name;
    const order = [];
    /* Data for Update */
    if (thisRouteValue === "updateOrder") {
      var params = router.currentRoute._rawValue.params;
      console.log(thisRouteValue, params.id);

      try {
        state.orderlist.filter(function (orders) {
          console.log(orders.id_order, params.id);
          if (orders.id_order == params.id) {
            for (let i = 0; i < orders.order_list.length; i++) {
              console.log(orders.order_list[i]);
              order.push(orders.order_list[i]);
            }
            return false;
          }
        });
      } catch {
        console.error("no se ha encontrado el order");
      }
    }
    /* END Data for update */
    console.log(order);
    var item;

    const clickToggle = (toggle, type) => {
      state.toggle = type ? true : false;
      if (state.productslist) {
        state.productfilter = state.productslist.filter(function (product) {
          console.log(product.categories.id == type);
          if (product.categories.id == type) return product;
        });
      }
      // console.log(state.productfilter);
    };

    const incrementOrder = (id) => {
      item = order.filter(function (product) {
        console.log(product.id_product);
        if (product.id_product === id) return product;
      });
      console.log(item.length);
      if (item.length === 0) {
        item = { id_product: id, qty: 1 };
        order.push(item);
      } else {
        order.map(function (product) {
          if (product.id_product === id) product.qty++;
          return product;
        });
      }
      console.log(order);
    };

    const decrementOrder = (id) => {
      item = order.filter(function (product) {
        if (product.id_product === id) return product;
      });
      if (item.length > 0) {
        order.map(function (product) {
          if (product.id_product === id) {
            product.qty = product.qty > 0 ? product.qty - 1 : 0;
          }
          return product;
        });
      }
      console.log(order);
    };
    const sendOrder = () => {
      if (thisRouteValue === "updateOrder") {
        alert("UPDATE Pedido");
        var params = router.currentRoute._rawValue.params;

        store.dispatch("order/" + Constant.UPDATE_ORDER, {
          order: order,
          id: params.id,
        });
      } else {
        alert("CREA Pedido");
        console.log(router.currentRoute._rawValue.params.id);
        let pedido =
          router.currentRoute._rawValue.params.id === "pedido"
            ? { order: order }
            : {
                order: order,
                id_client: router.currentRoute._rawValue.params.id,
              };
        store.dispatch("order/" + Constant.ADD_ORDER, pedido);
      }
    };
    return {
      state,
      categories,
      order,
      clickToggle,
      incrementOrder,
      decrementOrder,
      sendOrder,
    };
  },
};
</script>

<style></style>
