<template>
  <div>
    <Navbar />
    <v-main>
      <!-- <HelloWorld/> -->
      <v-snackbar class="py-5" :color="snackbar.color" v-model="snackbar.show">
        {{ snackbar.text }}

        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar.show = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-row justify="center">
        <v-col class="d-flex justify-space-around mt-10" cols="8">
          <h3 class="text-h3 blue-grey--text font-weight-bold">
            Product State
          </h3>
        </v-col>
      </v-row>

      <v-row class="home mt-10" justify="center">
        <v-col cols="8">
          <v-data-table
            :headers="headers"
            :items="desserts"
            class="elevation-1"
            :items-per-page="5"
          >
            <template v-slot:item.state="{ item }">
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="editState(item)"
                    rounded
                    :color="getColor(item.state)"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ item.state }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-btn text color="red" @click="updateState('Pending')"
                      >Pending</v-btn
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-btn
                      text
                      color="orange"
                      @click="updateState('in-Transit')"
                      >In Transit</v-btn
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-btn text color="green" @click="updateState('Recived')"
                      >Recived</v-btn
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon color="red lighten-2" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-main>
  </div>
</template>

<script>
import clientAxios from "@/config/AxiosClient";
import Navbar from "@/components/AdminProvider/Navbar.vue";
export default {
  name: "AdminProvider-state",
  components: {
    Navbar,
  },
  data() {
    return {
      currentState: [],
      snackbar: {
        show: false,
        text: `this is message`,
        color: "red lighten-2",
      },
      headers: [
        {
          text: "ID Product",
          align: "start",
          sortable: false,
          value: "buyId",
        },
        { text: "State", value: "state" },
        { text: "Created_at", value: "created_at" },
        { text: "Actions", value: "actions" },
      ],
      desserts: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getColor(state) {
      if (state === "Pending") return "red";
      else if (state === "in-Transit") return "orange";
      else return "green";
    },
    editState(item) {
      this.currentState = item;
    },
    async updateState(item) {
      let temp = {
        stateBuyId: this.currentState.buyId,
        total:this.currentState.total,
        state: item,
      };
      try {
        await clientAxios.put(`statebuys/${this.currentState.actions}`, temp);
        this.snackbar.show = true;
        this.snackbar.text = "buy updated successfully";
        this.snackbar.color = "success";
        this.getData();
      } catch (error) {
        this.snackbar.show = true;
        this.snackbar.color = "red lighten-2";
        this.snackbar.text = "The buy could not be updated, try again";
        console.log(error);
      }
    },
    async getData() {
      this.desserts = [];
      try {
        let res = await clientAxios.get("statebuys");

        res.data.forEach((item) => {
          let temp = {
            buyId: item.stateBuyId,
            state: item.state,
            total:item.total,
            created_at: item.created_at,
            actions: item.stateBuyId,
          };
          this.desserts.push(temp);
        });
      } catch (error) {
        this.snackbar.show = true;
        this.snackbar.text = "Error Buy page not found";
        console.log(error);
      }
    },
    async deleteItem(id) {
      try {
        await clientAxios.delete(`statebuys/${id.actions}`);
        this.snackbar.show = true;
        this.snackbar.color = "success";
        this.snackbar.text = "Buy deleted successfully";
        this.getData();
      } catch (error) {
        this.snackbar.show = true;
        this.snackbar.text = "Error the buy could not be removed";
        console.log(error);
      }
      console.log(id.actions);
    },
  },
};
</script>
