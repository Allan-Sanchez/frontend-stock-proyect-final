<template>
  <v-main class="container-style">
    <v-row class="container-login">
      <v-col md="6">
        <v-snackbar
        top
        color="red lighten-2"
      v-model="snackbar"
    >
      {{ textSnackbar }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

        <v-card>
          <v-card-title class="d-flex justify-center my-3">
            <h3 class="text-h3 blue-grey--text font-weight-bold">
              Register
            </h3>
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-center">
              <v-avatar size="128">
                <img
                  src="https://reviso-wordpress-sites.s3.amazonaws.com/uploads/sites/2/inventory-management-blog.png"
                  alt="John"
                />
              </v-avatar>
            </div>
            <form class="mx-5 py-5" @submit.prevent="register()">
              <v-row>
                <v-col md="6">
                  <v-text-field
                    v-model="form.name"
                    label="User name"
                    required
                    autofocus
                  ></v-text-field>
                </v-col>
                <v-col md="6">
                  <v-text-field
                    v-model="form.email"
                    type="email"
                    label="Type your email"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6">
                  <v-text-field
                    v-model="form.password"
                    label="Type your password"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="form.passwordConfirm"
                    label="Type again your password"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col md="6">
                  <v-btn
                    color="red lighten-2"
                    block
                    dark
                    class="mt-5"
                    >Cancel</v-btn
                  >
                </v-col>
                <v-col md="6">
                  <v-btn type="submit" color=" blue-grey" dark block class="mt-5"
                    >Create</v-btn
                  >
                </v-col>
              </v-row>
            </form>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <div class="mx-5 text--secondary text-center">
              If you already have an account log in <router-link to="/"> here</router-link>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import clientAxios from "@/config/AxiosClient.js"
export default {
  name: "Register",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        userRole:"Client"
      },
      snackbar: false,
      textSnackbar: ``,
    };
  },
 
  methods: {
    async register(){
      if (this.form.password === this.form.passwordConfirm && this.form.email !== '' && this.form.password !== '') {
        try {
          await clientAxios.post('users',this.form);
          this.$router.push('/');          
        } catch (error) {
          console.log(error);
          this.snackbar = true;
          this.textSnackbar= "The user could not be created, try again"
        }
        return
      }
      this.snackbar = true;
      this.textSnackbar= "The password must be the same in both fields";
    },
   },
};
</script>

<style scope>
.container-style {
  background: #c9c9c9;
}
.container-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
</style>
