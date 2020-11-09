<template>
  <v-app-bar app color="blue-grey lighten-1" dark>
    <div class="d-flex align-center">
      <v-img
        alt="cake Logo"
        class="shrink mr-5"
        contain
        src="../../assets/chocolate.svg"
        transition="scale-transition"
        width="40"
      />
      <!-- <v-btn text to="/adminclient/home"> -->
      <span
        style="cursor:pointer"
        class="text-h4 font-weight-bold py-2"
        @click="homePage()"
      >
        World Cake
      </span>
      <!-- </v-btn> -->
    </div>

    <v-spacer></v-spacer>

    <v-btn to="/adminclient/users" class="mr-2" text>
      <span class="font-weight-bold text-h6">Users</span>
    </v-btn>

    <v-btn to="/provider-hom" class="mr-2" text>
      <span class="font-weight-bold text-h6">Provider</span>
    </v-btn>

    <v-btn
      v-if="logout"
      class="mx-2"
      to="/provider-home"
      color="red lighter-2"
      @click="userLogout()"
    >
      <span class="mr-2 font-weight-bold text-h6">Logout</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AdminClient-Navbar",
  data() {
    return {
      logout: false,
    };
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (token) {
      this.logout = true;
    }
  },
  methods: {
    homePage() {
      this.$router.push("/adminclient/home");
    },
    userLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.logout = false;
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
