<template>
  <v-app-bar app color="red lighten-1" dark>
    <div class="d-flex align-center">
      <v-img
        alt="cake Logo"
        class="shrink mr-5"
        contain
        src="../assets/grain.svg"
        transition="scale-transition"
        width="40"
      />
      <span
        style="cursor:pointer"
        class="text-h4 font-weight-bold"
        @click="homePage()"
        >Ingredients</span
      >
    </div>

    <v-spacer></v-spacer>

    <v-btn text to="/provider-cart">
      <v-badge :content="count" :value="count" color="teal" overlap>
        <v-icon large>mdi-cart</v-icon>
      </v-badge>
    </v-btn>

    <v-btn
      v-if="logout"
      class="mx-2"
      to="/provider-home"
      color="blue-grey"
      @click="userLogout()"
    >
      <span class="mr-2 font-weight-bold text-h6">Logout</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: ["count"],
  name: "Navbar",
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
      this.$router.push("/provider-home");
    },
    userLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.logout = false;
      this.$router.push("/provider-home");
    },
  },
};
</script>
