<template>
  <v-container>
    <v-main>
      <v-row justify="center">
        <v-snackbar
          class="py-5"
          :color="snackbar.color"
          v-model="snackbar.show"
        >
          {{ snackbar.text }}

          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbar.show = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>

        <v-col cols="6" class="mt-15">
          <h3
            class="text-h3 text-center blue-grey--text text--darken-1 font-weight-bold"
          >
            Follow your Order
          </h3>
          <form class="d-flex align-center mt-5" @submit.prevent="search()">
            <v-text-field
              type="number"
              v-model="searchId"
              label="Type down your invoice number"
              required
            ></v-text-field>
            <v-btn type="submit" color="primary" rounded class="ml-6"
              >Search</v-btn
            >
          </form>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="6" v-if="!showCard">
          <h3
            class="text-h3 text-center blue-grey--text text--darken-1 font-weight-bold"
          >
            No order to show
          </h3>
        </v-col>
        <v-col v-else cols="3">
          <v-card>
            <v-card-title class="d-flex justify-center">Bill</v-card-title>
            <v-card-text
              >No.#{{ dataBill.bill }} the status of the order is, which was
              made on the date {{ dataBill.date }}</v-card-text
            >
            <v-card-actions class="d-flex justify-center">
              <v-chip
                v-if="dataBill.state === 'Pending'"
                class="ma-2"
                color="red"
                text-color="white"
              >
                <v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon> </v-avatar
                >Order Pending
              </v-chip>

              <v-chip
                v-else-if="dataBill.state === 'in-Transit'"
                class="ma-2"
                color="yellow"
                text-color="black"
              >
                <v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon> </v-avatar
                >Order in transit
              </v-chip>

              <v-chip v-else class="ma-2" color="teal" text-color="white">
                <v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon> </v-avatar
                >Order received
              </v-chip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-container>
</template>

<script>
import clientAxios from "@/config/AxiosClient";
export default {
  name: "ProviderState",
  data() {
    return {
      showCard: false,
      dataBill: this.$store.state.billProduct,
      updateState: null,
      searchId: null,
      snackbar: {
        show: false,
        text: `this is message`,
        color: "red lighten-2",
      },
    };
  },
  mounted() {
    if (!this.dataBill.length === 0) {
      this.showCard = true;
    }
  },
  methods: {
    async search() {
      try {
        let res = await clientAxios.get(`statebuys/${this.searchId}`);
        let data = {
          bill:res.data.stateBuyId,
          date:res.data.created_at,
          state:res.data.state
        }
        this.showCard = true;
        this.dataBill = data;
        // console.log(res.data);
      } catch (error) {
        console.log(error);
        this.snackbar.show = true;
        this.snackbar.color = "red lighten-2";
        this.snackbar.text = "Error order not found";
      }
      this.searchId = "";
    },
  },
};
</script>

<style>
#app {
  background: #cbd5e0;
}
</style>
