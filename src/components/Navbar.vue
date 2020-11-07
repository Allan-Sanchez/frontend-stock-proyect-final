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
      <span class="text-h4 font-weight-bold">Ingredients</span>
    </div>

    <v-spacer></v-spacer>

    <v-btn to="/provider-home"  text>
      <span class="mr-2 font-weight-bold text-h6">Home</span>
    </v-btn>
    
    <v-btn text to="/provider-cart">
    <v-badge
        :content="count"
        :value="count"
        color="teal"
        overlap
      >
        <v-icon large>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
    
  </v-app-bar>
</template>

<script>
export default {
  props:['count'],
  name: "Navbar",
  data() {
      return {
          messages: 5,
      }
  },
};
</script>