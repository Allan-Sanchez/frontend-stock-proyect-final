<template>
  <div>
    <Navbar />
    <v-main>
      <!-- <HelloWorld/> -->
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

        <v-col class="d-flex justify-space-around mt-10" cols="8">
          <h3 class="text-h3 blue-grey--text font-weight-bold">
            User List
          </h3>
          <!-- <v-btn color="blue-grey" class="white--text" large
            >New Ingrediente</v-btn
          > -->

          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red lighten-2" large dark v-bind="attrs" v-on="on">
                New User
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="text-h5 blue-grey--text font-weight-bold">
                  User Form</span
                >
              </v-card-title>

              <v-card-text>
                <form class="mx-5 py-5" @submit.prevent="saveUser()">
                  <v-text-field
                    v-model="form.name"
                    label="User name"
                    required
                    autofocus
                  ></v-text-field>

                  <v-text-field
                    v-model="form.email"
                    type="email"
                    label="Type your email"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="form.password"
                    label="Type your password"
                    type="password"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="form.passwordConfirm"
                    label="Type again your password"
                    type="password"
                    required
                  ></v-text-field>

                  <v-row>
                    <v-col md="6">
                      <v-btn
                        color="red lighten-2"
                        block
                        dark
                        class="mt-5"
                        @click="closeModal()"
                        >Cancel</v-btn
                      >
                    </v-col>
                    <v-col md="6">
                      <v-btn
                        v-if="btnEdit"
                        type="submit"
                        color=" blue-grey"
                        dark
                        block
                        class="mt-5"
                        >Create</v-btn
                      >
                      <v-btn
                        @click="update()"
                        v-else
                        color="success"
                        dark
                        block
                        class="mt-5"
                        >Update</v-btn
                      >
                    </v-col>
                  </v-row>
                </form>
              </v-card-text>
            </v-card>
          </v-dialog>
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
            <!-- {{#lint} -->
            <template v-slot:item.actions="{ item }">
              <v-icon color=" blue-grey" class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
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
import Navbar from "@/components/AdminClient/Navbar.vue";

export default {
  name: "AdminClient-Users",
  components: {
    Navbar,
  },
  data() {
    return {
      userId: null,
      form: {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        userRole: "User",
      },
      snackbar: {
        show: false,
        text: `this is message`,
        color: "red lighten-2",
      },
      btnEdit: true,
      dialog: false,
      headers: [
        {
          text: "Name User",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Email", value: "email" },
        { text: "Actions", value: "actions" },
      ],
      desserts: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async saveUser() {
      if (
        this.form.password === this.form.passwordConfirm &&
        this.form.email !== "" &&
        this.form.name !== "" &&
        this.form.password !== ""
      ) {
        try {
          await clientAxios.post("users", this.form);
          this.cleanData();
          this.getData();
          this.snackbar.show = true;
          this.snackbar.color = "success";
          this.snackbar.text = "The user could not be created, try again";
        } catch (error) {
          console.log(error);
          this.snackbar.show = true;
          this.snackbar.color = "red lighten-2";
          this.snackbar.text = "The user could not be created, try again";
        }
        return;
      }
      this.snackbar.show = true;
      this.snackbar.text = "The password must be the same in both fields";
    },
    async deleteItem(id) {
      try {
        await clientAxios.delete(`users/${id.actions}`);
        this.snackbar.show = true;
        this.snackbar.color = "success";
        this.snackbar.text = "User deleted successfully";
        this.getData();
      } catch (error) {
        this.snackbar.show = true;
        this.snackbar.text = "Error the users could not be removed";
        console.log(error);
      }
    },
    async editItem(id) {
      try {
        let res = await clientAxios.get(`users/${id.actions}`);
        this.dialog = true;
        this.btnEdit = false;
        this.form.name = res.data.name;
        this.form.email = res.data.email;
        this.userId = res.data.userId;
      } catch (error) {
        this.snackbar.show = true;
        this.snackbar.text = "Error the user could not be found";
        console.log(error);
      }
    },
    async update() {
      if (
        this.form.password === this.form.passwordConfirm &&
        this.form.email !== "" &&
        this.form.name !== "" &&
        this.form.password !== ""
      ) {
        let temp = {
          userId: this.userId,
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          userRole: this.form.userRole,
        };
        try {
          await clientAxios.put(`users/${this.userId}`, temp);
          this.snackbar.show = true;
          this.snackbar.text = "User updated successfully";
          this.snackbar.color = "success";
          this.cleanData();
          this.getData();
        } catch (error) {
          this.snackbar.show = true;
          this.snackbar.color = "red lighten-2";
          this.snackbar.text = "The user could not be updated, try again";
          console.log(error);
        }
        return;
      }
      this.snackbar.show = true;
      this.snackbar.color = "red lighten-2";
      this.snackbar.text = "The password must be the same in both fields";
    },
    async getData() {
      this.desserts = [];
      try {
        let res = await clientAxios.get("users");
        let tableData = res.data.filter((item) => {
          return item.userRole === "User";
        });

        tableData.forEach((item) => {
          let temp = {
            name: item.name,
            email: item.email,
            actions: item.userId,
          };
          this.desserts.push(temp);
        });
      } catch (error) {
        console.log(error);
      }
    },
    cleanData() {
      this.dialog = false;
      this.btnEdit = true;
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
      this.form.passwordConfirm = "";
    },
    closeModal() {
      this.dialog = false;
    },
    getColor(quantity) {
      if (quantity < 10) return "red";
      else if (quantity < 25) return "orange";
      else return "green";
    },
  },
};
</script>

<style></style>
