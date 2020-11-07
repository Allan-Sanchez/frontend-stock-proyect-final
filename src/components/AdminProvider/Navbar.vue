<template>
  <v-app-bar app color="red lighten-1" dark>
    <div class="d-flex align-center">
      <v-img
        alt="cake Logo"
        class="shrink mr-5"
        contain
        src="../../assets/grain.svg"
        transition="scale-transition"
        width="40"
      />
      <v-btn to="/adminprovider/home" text class="text-capitalize">
      <span class="text-h4 font-weight-bold">Ingredients</span>
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    
     <v-btn to="/adminprovider/users"  text>
      <span class="mr-2 font-weight-bold text-h6">Users</span>
    </v-btn>

     <v-btn to="/provider-home"  text>
      <span class="mr-2 font-weight-bold text-h6">State</span>
    </v-btn>
    
    
    
  </v-app-bar>
</template>

<script>
export default {
  name: "AdminProvide-Navbar",
  data() {
      return {
          messages: 5,
      }
  },
};
</script>