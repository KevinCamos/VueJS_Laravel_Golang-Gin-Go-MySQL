<template>
  <tr :id="orderitem.id">
    <td>
      {{ orderitem.id }}
    </td>
    <td @click.stop="editOrder(orderitem.id)" class="edit">Editar</td>
    <td @click.stop="deleteOrder(orderitem.id)" class="delete">Eliminar</td>
  </tr>
</template>

<script>
import Constant from "../Constant";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  props: {
    orderitem: Object,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const deleteOrder = (id) => {
      console.log("delete");

      console.log(id);

      store.dispatch("order/" + Constant.DELETE_ORDER, { id });
    };
    const editOrder = (id) => {
      console.log("eh");
      router.push({ name: "updateOrder", params: { id } });
    };

    return { deleteOrder, editOrder };
  },
};
</script>

<style>
tr:hover {
  cursor: pointer;
}
.edit:hover {
  background-color: rgb(144, 238, 144);
  color: green;
}
.delete:hover {
  background-color: #ff8080;
  color: darkred;
}
</style>
