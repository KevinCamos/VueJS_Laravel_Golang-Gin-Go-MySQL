<template>
  <section>
    <div v-if="state.toggle == false" class="row justify-content-center">
      <suspense>
        <template #default>
          <Card-Category
            v-for="category in state.categorieslist"
            :key="category"
            @clickToggle="clickToggle(true, category.id)"
            :categoryitem="category"
          ></Card-Category>
        </template>
        <template #fallback>
          <h2>loading...</h2>
        </template>
      </suspense>
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
        :isCard="true"
        :isUpdate="true"
      ></Card-Product>
    </div>

    <!-- Tabla de contenido-->
    <div v-if="state.totalPrice > 0 && state.toggle == false">
      <table
        class="table table-hover table-striped table-bordered m-2 text-center"
      >
        <caption class="text-center">
          Pedidos
        </caption>
        <thead class="thead-dark">
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Precio/U</th>
            <th>Rest</th>
            <th>Total/U</th>
            <th>Añad</th>
            <th>Precio Total</th>
          </tr>
        </thead>
        <tbody>
          <Card-Product
            v-for="productitem in state.productslist"
            :key="productitem.id"
            @increment-count="incrementOrder(productitem.id)"
            @decrement-count="decrementOrder(productitem.id)"
            :productitem="productitem"
            :order="order"
            :isCard="false"
            :isUpdate="true"
          ></Card-Product>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="6">TOTAL PEDIDO</th>
            <th>{{ state.totalPrice }}€</th>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="row justify-content-center position-sticky bottom-0">
      <button
        type="button"
        class="btn btn-success position-sticky bottom-0"
        @click="sendOrder()"
      >
        CONFIRMAR PEDIDO
      </button>
    </div>
  </section>
</template>
<script>
import CardProduct from "../../components/CardProduct.vue";
// import CardCategory from "../../components/CardCategory.vue";

import { reactive, computed, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import Constant from "../../Constant";

export default {
  components: {
    CardProduct,
    CardCategory: defineAsyncComponent(() =>
      import("../../components/CardCategory.vue")
    ),
  },

    setup() {
    const router = useRouter();
    const store = useStore();

    const state =   reactive({
      toggle: false,
      categorieslist: computed(() => store.getters["categories/getCategories"]),
      productslist: computed(() => store.getters["products/getProducts"]),
      orderlist: computed(() => store.getters["order/getOrder"]),
      tablelist: computed(() => store.getters["table/getOrder"]),
      productfilter: "",
      totalPrice: 0,
    });

    console.log(state.tablelist);
    if (!state.productslist) {
      store.dispatch("products/" + Constant.INITIALIZE_PRODUCTS);
    }
    if (!state.categorieslist) {
      store.dispatch("categories/" + Constant.INITIALIZE_CATEGORIES);
    }

    /* Vars for create the order */
    const thisRouteValue = router.currentRoute._value.name;
    const order = [];
    /* Data for Update */
    if (thisRouteValue === "updateOrder" || thisRouteValue === "updateTable") {
      // if (thisRouteValue === "updateTable") state.productlist = state.tablelist;
      var params = router.currentRoute._rawValue.params;
      console.log(thisRouteValue, params.id);

      try {
        state.orderlist.filter(function (orders) {
          console.log(orders.id_order, params.id);
          if (orders.id_order == params.id) {
            for (let i = 0; i < orders.order_list.length; i++) {
              // console.log(orders.order_list[i]);
              order.push(orders.order_list[i]);
            }
            return false;
          }
        });
      } catch {
        console.error("no se ha encontrado el order");
      }
    }

    const totalPrice = () => {
      state.totalPrice = 0;
      if (state.productslist != undefined) {
        for (let i = 0; i < order.length; i++) {
          console.log(order[i].id_product);
          for (let e = 0; e < state.productslist.length; e++) {
            if (order[i].id_product == state.productslist[e].id) {
              state.totalPrice += order[i].qty * state.productslist[e].price;
              console.log(state.totalPrice);
            }
          }
        }
      }
      order.length;
      console.log(state.totalPrice);
    };
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

    /* END Data for update */
    var item;
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
      totalPrice();

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
      totalPrice();

      console.log(order);
    };
    const sendOrder = () => {
      if (
        thisRouteValue === "updateOrder" ||
        thisRouteValue === "updateTable"
      ) {
        alert("UPDATE Pedido");
        var params = router.currentRoute._rawValue.params;

        store.dispatch("order/" + Constant.UPDATE_ORDER, {
          order: order,
          id: params.id,
        });

        // if (thisRouteValue === "updateTable") router.push({ name: "tableList" });
        // else router.push({ name: "orderList" });
      } else {
        // alert("CREA Pedido");
        console.log(router.currentRoute._rawValue.params.id);
        let routeId = router.currentRoute._rawValue.params.id;
        let pedido =
          routeId === "pedido"
            ? { order: order }
            : {
                order: order,
                id_client: router.currentRoute._rawValue.params.id,
              };
        store.dispatch("order/" + Constant.ADD_ORDER, pedido);

        // if (routeId === "pedido") router.push({ name: "orderList" });
        // else router.push({ name: "tableList" });
      }
      router.push({ name: "orderList" });
    };
    totalPrice();

    return {
      state,
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
