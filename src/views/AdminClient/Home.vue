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
            Stock of ingredients
          </h3>

          <v-dialog v-model="dialog" width="900">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red lighten-2" large dark v-bind="attrs" v-on="on">
                New Ingredient
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span class="text-h5 blue-grey--text font-weight-bold">
                  Ingredient Form</span
                >
              </v-card-title>

              <v-card-text>
                <form class="mx-5 py-5" @submit.prevent="saveProduct()">
                  <v-row>
                    <v-col md="4">
                      <v-text-field
                        v-model="form.name"
                        label="Product name"
                        required
                        autofocus
                      ></v-text-field>
                    </v-col>
                    <v-col md="4">
                      <v-text-field
                        v-model="form.quantity"
                        label="type initial quantity"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col md="4">
                      <v-text-field
                        v-model="form.price"
                        label="Unit price"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col md="6">
                      <v-text-field
                        v-model="form.image"
                        label="Paste your image link"
                        required
                        @change="handleImage($event)"
                      ></v-text-field>

                      <v-img
                        contain
                        max-height="150"
                        :src="imageView"
                        aspect-ratio="1.7"
                      ></v-img>
                    </v-col>
                    <v-col md="6">
                      <v-textarea
                        name="description"
                        label="type product description"
                        v-model="form.description"
                      ></v-textarea>
                    </v-col>
                  </v-row>

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
                        v-else
                        @click="update()"
                        color="success"
                        dark
                        block
                        class="mt-5"
                        >Edit</v-btn
                      >
                    </v-col>
                  </v-row>
                </form>
              </v-card-text>

              <v-divider></v-divider>
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
            <template v-slot:item.image="{ item }">
              <v-avatar>
                <img :src="item.image" :alt="item.name" />
                <!-- <img :src="item.image" :alt="item.name" /> -->
              </v-avatar>
            </template>

            <template v-slot:item.quantity="{ item }">
              <v-chip :color="getColor(item.quantity)" dark>{{
                item.quantity
              }}</v-chip>
            </template>

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
  name: "AdminClient-Home",
  components: {
    Navbar,
  },
  data() {
    return {
      clientId: null,
      form: {
        name: "",
        image: "",
        description: "",
        quantity: "",
        price: "",
      },
      dialog: false,
      btnEdit: true,
      snackbar: {
        show: false,
        text: `this is message`,
        color: "red lighten-2",
      },
      imageView:
        "https://res.cloudinary.com/dx9n8tsyu/image/upload/v1604719543/inventory-umg/NotImage_rphrq6.png",
      headers: [
        {
          text: "Name Product",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Image Product", value: "image" },
        { text: "Quantity", value: "quantity" },
        { text: "Actions", value: "actions" },
      ],
      desserts: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async saveProduct() {
      try {
        await clientAxios.post("clients", this.form);
        this.snackbar.show = true;
        this.snackbar.text = "product added successfully";
        this.snackbar.color = "success";
        this.cleanForm();
        this.getData();
      } catch (error) {
        this.snackbar.show = true;
        this.snackbar.color = "red lighten-2";
        this.snackbar.text = "Error uncreated product";
        console.log(error);
      }

      // console.log(this.form);
    },
    async getData() {
      this.desserts = [];
      try {
        let res = await clientAxios.get("clients");

        res.data.forEach((item) => {
          let temp = {
            name: item.name,
            image: item.image,
            quantity: item.quantity,
            actions: item.clientId,
          };
          this.desserts.push(temp);
        });
      } catch (error) {
        this.snackbar.show = true;
        this.snackbar.text = "Error Product page not found";
        console.log(error);
      }
    },
    async deleteItem(id) {
      try {
        await clientAxios.delete(`clients/${id.actions}`);
        this.snackbar.show = true;
        this.snackbar.color = "success";
        this.snackbar.text = "Product deleted successfully";
        this.getData();
      } catch (error) {
        this.snackbar.show = true;
        this.snackbar.text = "Error the product could not be removed";
        console.log(error);
      }
      console.log(id.actions);
    },
    async editItem(id) {
      try {
        let res = await clientAxios.get(`clients/${id.actions}`);
        this.dialog = true;
        this.btnEdit = false;
        this.form.name = res.data.name;
        this.form.quantity = res.data.quantity;
        this.imageView = res.data.image;
        this.form.price = res.data.price;
        this.form.image = res.data.image;
        this.form.description = res.data.description;
        this.clientId = res.data.clientId;
      } catch (error) {
        this.snackbar.show = true;
        this.snackbar.text = "Error the product could not be found";
        console.log(error);
      }
    },
    async update() {
      let temp = {
        clientId: this.clientId,
        name: this.form.name,
        quantity: this.form.quantity,
        price: this.form.price,
        image: this.form.image,
        description: this.form.description,
      };
      try {
        await clientAxios.put(`clients/${this.clientId}`, temp);
        this.snackbar.show = true;
        this.snackbar.text = "product updated successfully";
        this.snackbar.color = "success";
        this.cleanForm();
        this.getData();
      } catch (error) {
        this.snackbar.show = true;
        this.snackbar.color = "red lighten-2";
        this.snackbar.text = "The product could not be updated, try again";
        console.log(error);
      }
    },
    cleanForm() {
      this.dialog = false;
      this.btnEdit = true;
      this.form.name = "";
      this.form.quantity = "";
      this.form.price = "";
      this.form.image = "";
      this.form.description = "";
      this.imageView =
        "https://res.cloudinary.com/dx9n8tsyu/image/upload/v1604719543/inventory-umg/NotImage_rphrq6.png";
    },

    getColor(quantity) {
      if (quantity < 10) return "red";
      else if (quantity < 25) return "orange";
      else return "green";
    },
    handleImage(e) {
      this.imageView = e;
    },
    closeModal() {
      this.dialog = false;
    },
  },
};
</script>

<style></style>
