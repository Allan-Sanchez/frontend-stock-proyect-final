<template>
  <v-container>
    <Navbar :count="0"></Navbar>

    <v-main>
      <v-row>
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

        <v-col cols="12">
          <v-card v-for="(item, index) in products" :key="index">
            <div class="d-flex flex-no-wrap justify-space-around align-center">
              <v-avatar class size="100" tile>
                <v-img :src="item.image"></v-img>
              </v-avatar>
              <v-card-title class="headline">{{ item.name }}</v-card-title>
              <div class="d-flex align-center">
                <v-btn
                  fab
                  dark
                  small
                  color="primary"
                  @click="minusQuantity(item)"
                >
                  <v-icon dark>mdi-minus</v-icon>
                </v-btn>
                <div class="mx-4">{{ item.quantity }}</div>
                <v-btn
                  fab
                  dark
                  small
                  color="teal"
                  @click="plusQuantity(item.id)"
                >
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </div>
              <v-card-subtitle> Price: ${{ item.total }} </v-card-subtitle>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" class="d-flex justify-end align-center pr-10">
          <!-- to="/provider-state" -->
          <v-btn color="red" class="white--text" rounded @click="totalPay()">
            Total Price $ {{ total }}
          </v-btn>
        </v-col>
      </v-row>
    </v-main>
  </v-container>
</template>

<script>
import clientAxios from "@/config/AxiosClient";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "ProviderCart",
  components: {
    Navbar,
  },
  data() {
    return {
      total: this.$store.getters.totalPlusCart,
      products: this.$store.state.cartProduct,
      bill: null,
      snackbar: {
        show: false,
        text: `this is message`,
        color: "red lighten-2",
      },
    };
  },
  methods: {
    minusQuantity(item) {
      if (item.quantity > 1) {
        this.$store.commit("removeQuantity", item.id);
        this.total = this.$store.getters.totalPlusCart;
      }
    },
    plusQuantity(id) {
      this.$store.commit("plusQuantity", id);
      this.total = this.$store.getters.totalPlusCart;
    },
    async totalPay() {
      let currentUser = localStorage.getItem("userId");
      if (currentUser === null) {
        this.$router.push("/");
        return;
      }
      try {
        let data = {
          state: "Pending",
          total: this.total,
        };
        let res = await clientAxios.post("stateBuys", data);
        let productCard = this.$store.state.products;

        await productCard.forEach((item) => {
          let temp = {
            userId: currentUser,
            quantity: item.quantity,
            providerId: item.id,
            stateBuyId: res.data.stateBuyId,
          };
          clientAxios.post("buys", temp);
        });

        let dateBill = {
          bill:  res.data.stateBuyId,
          date:  res.data.created_at,
          state:  res.data.state
        };
        this.$store.commit("addBill", dateBill);
        this.$router.push("/provider-state");
      } catch (error) {
        this.snackbar.show = true;
        this.snackbar.color = "red lighten-2";
        this.snackbar.text = "Error Product page not found";
        console.log(error);
      }
    },
  },
};
</script>

<style>
#app {
  background: #cbd5e0;
}
</style>
