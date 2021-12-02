<template>
  <tr :id="workeritem.id">
    <td>
      {{ workeritem.name }}
    </td>
    <td>
      {{ workeritem.appointment }}
    </td>

    <td @click.stop="editWork(workeritem.id)" class="edit">Editar</td>
    <td @click.stop="deleteWork(workeritem.id)" class="delete">Eliminar</td>
  </tr>
</template>

<script>
import Constant from "../Constant";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  props: {
    workeritem: Object,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    /*   const checked = (active) => {
      console.log("checked");
      return { "list-group-item": true, "list-group-item-success": active };
    }; */
    /*   const toggleDone = (id) => {
      console.log("toggle");

      store.dispatch(Constant.TOGGLE_DONE, { id });
    }; */
    const deleteWork = (id) => {
      console.log("delete");

      console.log(id);

      store.dispatch("worker/" + Constant.DELETE_WORKER, { id });
    };
    const editWork = (id) => {
      // store.dispatch("worker/"+Constant.UPDATE_WORKER, {
      //   workeritem: { ...props.workeritem },
      // });
      router.push({ name: "updateWorker", params: { id } });
    };

    return { /* toggleDone, */ deleteWork, editWork /* checked */ };
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
