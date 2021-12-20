<template>
    <div class="card col-6 m-5" style="width: 18rem">
        <img
          class="card-img-top m-1"
          src="https://offloadmedia.feverup.com/valenciasecreta.com/wp-content/uploads/2021/03/11054825/coca-cola-valencia-1024x512.jpg"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">Bebidas</h5>
          <p class="card-text">
           Elegir entre las bebidas
          </p>
          <button  class="btn btn-primary">-</button>
          0 num metido a piñon, cambiar
          <button  class="btn btn-primary">+</button>
        </div>
      </div>






  <!--   <li class="list-group-item">
        <span :class="{ pointer: true, 'todo-done': productitem.active }" 
            :title="'Explanation : ' + productitem.name" :id="productitem.id">
            {{ productitem.name }}
        </span>
        <div class="float-right">
            <span class="badge badge-secondary pointer ml-1 text-primary" @click.stop="editWork(productitem.id)"> Edit </span>
            <span class="badge badge-secondary pointer ml-1 text-primary" @click.stop="deleteWork(productitem.id)" >Delete</span>
        </div>
    </li> -->
    
</template>

<script>
    export default {
        props: {

            name: String,
            description: String,
            // mount: Number
        
        },

        setup() {
    //  /*        const store = useStore();
    //         const router = useRouter();

    //         const deleteWork = (id) => {
    //             store.dispatch("products/"+Constant.DELETE_PRODUCTS, { id });
    //         };

    //         const editWork = (id) => {
    //             router.push({ name: "updateProduct", params: { id } });
    //         }; */

            return {  };
        },
    }; 
</script>

<style></style>
