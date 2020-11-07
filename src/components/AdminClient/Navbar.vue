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
        <span class="text-h4 font-weight-bold">World Cake</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn to="/adminclient/home"  text>
        <span class="mr-2 font-weight-bold text-h6">Home</span>
      </v-btn>

      <v-btn to="/adminclient/users" class="mr-2" text>
        <span class="font-weight-bold text-h6">Users</span>
      </v-btn>

      <v-btn
        to="/provider-home"
        color="green lighter-2"
      >
        <span class="mr-2 font-weight-bold text-h6">Provider</span>
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    name:"AdminClient-Navbar"
}
</script>

<style>

</style>