<template>
  <v-main class="container-style">
    <v-row class="container-login">
      <v-col md="4">
        <v-snackbar top color="red lighten-2" v-model="snackbar">
          {{ textSnackbar }}

          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <v-card>
          <v-card-title class="d-flex justify-center my-3">
            <h3 class="text-h3 blue-grey--text font-weight-bold">
              Login
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
            <form class="mx-5" @submit.prevent="login()">
              <v-text-field
                v-model="form.email"
                label="Type your email"
                required
                autofocus
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                label="Type your email"
                required
                type="password"
              ></v-text-field>
              <v-btn type="submit" color="primary" block class="mt-5">Login</v-btn>
            </form>
          </v-card-text>
          <v-card-actions>
            <div class="mx-5 text--secondary text-center">
              Please contact your supervisor if you do not have a user
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import clientAxios from "@/config/AxiosClient";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      snackbar: false,
      textSnackbar: ``,
    };
  },
  methods: {
    async login() {
      try {
        let res = await clientAxios.post("login", this.form);
        this.$store.commit('getUser',res.data);
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('userId',res.data.userDetails.userId);
        
        if (res.data.userDetails.userRole === "User") {
          this.$router.push('/provider-home');
          return
        }

         if (res.data.userDetails.userRole === "Admin") {
          this.$router.push('/adminprovider/home');
          return
        }
         if (res.data.userDetails.userRole === "Client") {
          this.$router.push('/adminclient/home');
          return
        }
        

      } catch (error) {
        console.log(error);
        this.snackbar= true;
        this.textSnackbar = "Email or Password incorrect";
      }
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
