<template>
  <v-container>
    <v-main>
      <v-row justify="center">
        <v-col cols="6" class="mt-15">
          <h3
            class="text-h3 text-center blue-grey--text text--darken-1 font-weight-bold"
          >Follow your Order</h3>
          <v-form class="d-flex align-center mt-5">
            <v-text-field v-model="name" label="Type your purchase code" required></v-text-field>
            <v-btn color="primary" rounded class="ml-6">Search</v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="3">
          <v-card>
            <v-card-title class="d-flex justify-center">Bill</v-card-title>
            <v-card-text>No.#{{dataBill.bill}}the status of the order is, which was made on the date {{dataBill.date}}</v-card-text>
            <v-card-actions class="d-flex justify-center">
              <v-chip
                v-if="dataBill.state === 'requested'"
                class="ma-2"
                color="red"
                text-color="white"
              >
                <v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>Order requested
              </v-chip>

              <v-chip
                v-else-if="dataBill.state === 'in transit'"
                class="ma-2"
                color="yellow"
                text-color="black"
              >
                <v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>Order in transit
              </v-chip>

              <v-chip v-else class="ma-2" color="teal" text-color="white">
                <v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>Order received
              </v-chip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-container>
</template>

<script>
export default {
  name: "ProviderState",
  data() {
    return {
      dataBill: this.$store.state.billProduct,
      updateState: null,
      name: null,
    };
  },
  mounted() {
    setTimeout(() => {
      let state = "in transit";

      this.$store.commit("updateBill", state);
      this.dataBill.state = state;
    }, 10000);

    setTimeout(() => {
      let state = "received";

      this.$store.commit("updateBill", state);
      this.dataBill.state = state;
    }, 20000);
  },
};
</script>

<style >
#app {
  background: #cbd5e0;
}
</style>