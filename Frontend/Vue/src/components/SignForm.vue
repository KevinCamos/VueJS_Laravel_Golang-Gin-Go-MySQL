<template>
    <div class="card-body p-5">
        <h1 class="fs-4 card-title fw-bold">{{type}}</h1>
        <form>
            <div class="mb-3" v-if="type === 'Sign Up'">
                <label class="mb-2 text-muted" for="name">Username</label>
                <input id="username" type="text" class="form-control" name="username" v-model="v$.form.username.$model" required autofocus>
                <div class="input-errors" v-for="(error, index) of v$.form.username.$errors" :key="index">
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

            <div class="d-flex align-items-center">
                <div class="form-check" v-if="type !== 'Sign Up'">
                    <input type="checkbox" name="remember" id="remember" class="form-check-input">
                    <label for="remember" class="form-check-label">Remember Me</label>
                </div>
                <button type="submit" class="btn btn-primary ms-auto">
                    Login
                </button>
            </div>
        </form>
    </div>
    <div class="card-footer py-3 border-0" v-if="type !== 'Sign Up'">
        <div class="text-center">
            Don't have an account? <router-link class="text-dark" to="/signup">Create One</router-link>
        </div>
    </div>
</template>

<script>
    import useVuelidate from '@vuelidate/core'
    import { required, email, minLength, sameAs } from '@vuelidate/validators'
   /*  import { ref, computed } from "vue"; */

    export default {
        name: "SignForm",
        props: {
            type: String,
        },
        setup () {
            return { 
                v$: useVuelidate() 
            }
        },

        data() {
            return {
                form: {
                    username: '',
                    email: '',
                    password: '',
                    repeatPassword: ''
                },
            }
        },
            
        validations() {
            return {
                form: {
                    username: {
                        required,
                        min: minLength(8)
                    },
                    email: {
                        required, 
                        email 
                    },
                    password: {
                        required, 
                        min: minLength(8)
                    },
                    repeatPassword: { 
                        sameAsPassword: sameAs(this.form.password)
                    }
                },
            }
        }

        /*  setup () {
            const username = ref("");
            const email = ref("");
            const password = ref("");
            const repeatPassword = ref("");

            const rules = computed(() => ({
                username: {
                    required,
                    min: minLength(8)
                },
                email: {
                    required, 
                    email 
                },
                password: {
                    required, 
                    min: minLength(8)
                },
                repeatPassword: { 
                    sameAsPassword: sameAs(this.form.password)
                }
            }));

            const v$ = useVuelidate(rules, { username, email, password, repeatPassword });
            
            return { username, email, password, repeatPassword, v$ };
        } */
    }
</script>

<style>

</style>