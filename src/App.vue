<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import authToken from "@/config/AuthToken";

export default {
  name: "App",

  components: {
    // HelloWorld,
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      authToken(token);
    }
  },

  data: () => ({
    //
  }),
};
</script>
