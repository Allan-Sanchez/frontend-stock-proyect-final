<template>
  <v-main class="container-style">
    <v-row class="container-login">
      <v-col md="4">
        <v-card>
          <v-card-title class="d-flex justify-center text-h3 my-3">Login</v-card-title>
          <v-card-text>
            <div class="d-flex justify-center">

            <v-avatar size="128">
              <img
                src="https://reviso-wordpress-sites.s3.amazonaws.com/uploads/sites/2/inventory-management-blog.png"
                alt="John"
              />
            </v-avatar>
            </div>
            <v-form class="mx-5">
              <v-text-field
                v-model="email"
                label="Type your email"
                required
                autofocus
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Type your email"
                required
                type="password"
              ></v-text-field>
              <v-btn color="primary" block class="mt-5">Login</v-btn>
            </v-form>
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
export default {
  name: "Login",
  data() {
      return {
          email:'',
          password:''
      }
  },
};
</script>

<style scope>
.container-style{
    background: #c9c9c9;
}
.container-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
</style>
