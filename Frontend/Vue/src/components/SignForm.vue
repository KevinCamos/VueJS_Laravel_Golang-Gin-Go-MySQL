<template>
    <div>
        <div class="card-body p-5">
            <h1 class="fs-4 card-title fw-bold">{{type}}</h1>
            <form>
                <div class="mb-3" v-if="type === 'Sign Up'">
                    <label class="mb-2 text-muted" for="name">Username</label>
                    <input id="name" type="text" class="form-control" name="name" v-model="v$.form.name.$model" required autofocus>
                    <div class="input-errors" v-for="(error, index) of v$.form.name.$errors" :key="index">
                        <div class="error-msg text-danger">{{ error.$message }}</div>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="mb-2 text-muted" for="email">E-Mail Address</label>
                    <input id="email" type="email" class="form-control" name="email" v-model="v$.form.email.$model" required autofocus>
                    <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
                        <div class="error-msg text-danger">{{ error.$message }}</div>
                    </div>
                </div>

                <div class="mb-3">
                    <div class="mb-2">
                        <label class="text-muted" for="password">Password</label>
                        <a href="forgot.html" class="float-end" v-if="type !== 'Sign Up'">
                            Forgot Password?
                        </a>
                    </div>
                    <input id="password" type="password" class="form-control" name="password" v-model="v$.form.password.$model" required>
                    <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
                        <div class="error-msg text-danger">{{ error.$message }}</div>
                    </div>
                </div>

                <div class="mb-3" v-if="type === 'Sign Up'">
                    <div class="mb-2">
                        <label class="text-muted" for="repeatPassword">Repeat Password</label>
                    </div>
                    <input id="repeatPassword" type="password" class="form-control" name="repeatPassword" v-model="v$.form.repeatPassword.$model" required>
                    <div class="input-errors" v-for="(error, index) of v$.form.repeatPassword.$errors" :key="index">
                        <div class="error-msg text-danger">{{ error.$message }}</div>
                    </div>
                </div>

                <div class="d-flex align-items-center" >
                    <div class="form-check" v-if="type !== 'Sign Up'">
                        <input type="checkbox" name="modeadmin" id="modeadmin" class="form-check-input" v-model="state.adminmode" @click="click" >
                        <label for="remember" class="form-check-label">Modo Admin</label>
                    </div>
                    <button v-if="type !== 'Sign Up'" type="button" class="btn btn-primary ms-auto" @click="login()">
                    <!-- @click="login()"> -->
                        Login
                    </button>
                        <button v-else type="button" class="btn btn-primary ms-auto" @click="register()" >
                        Crear Usuario
                    </button>
                </div>
            </form>
        </div>
        <div class="card-footer py-3 border-0" v-if="type !== 'Sign Up'">
            <div class="text-center">
                Don't have an account? <router-link class="text-dark" to="/signup">Create One</router-link>
            </div>
        </div>
    </div>
</template>

<script>

import useVuelidate from "@vuelidate/core";
import { reactive, computed } from "vue";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
// import { useCssVars } from "vue-demi";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Constant from "../Constant";

export default {
  name: "SignForm",
  props: {
    type: String,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      form: {
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      },
      adminmode: false,
    });

    const rules = computed(() => {
      return {
        form: {
          name: {
            required,
            min: minLength(8),
          },
          email: {
            required,
            email,
          },
          password: {
            required,
            min: minLength(7),
          },
         repeatPassword: {
            sameAsPassword: sameAs(state.form.password),
          },
        },
      };
    });
    const click = () => {
      console.log(state.adminmode);
    };
    const v$ = useVuelidate(rules, state);

    return { state, v$, click , store};
  },
  methods: {
    login() {
      console.log(this.v$.form.email.$error);
      console.log(this.state.adminmode);

      this.v$.$validate();
      if (!this.v$.form.email.$error && !this.v$.form.password.$error) {
        /* Per a entrar amb el mode admin */
        if (this.state.adminmode) {
          alert("S'envia a GO");

          this.store.dispatch("worker/" + Constant.LOGIN_ADMIN_WORKER, {
            dataUser: this.state.form,
          });
        } else {
          alert("S'envia a LARAVEL");

          this.store.dispatch("user/" + Constant.LOGIN_USER, {
            dataUser: this.state.form,
          });
        }
      } else {
        /* NO VALIDA*/

        alert("error!");
      }
    },
    register() {
      this.v$.$validate();
      if (!this.v$.$error) {
        /* REGISTRAR PER LARAVEL */
          this.store.dispatch("user/" + Constant.REGISTER_USER, {
            dataUser: this.state.form,
          });
        alert("Els 4 inputs es validen");
      } else {
        /* NO VALIDA*/

        alert("Algún input no valida");
      }
    },
  },
};
</script>

<style></style>
