<template>
  <div>
    <Navbar />
    <v-main>
      <!-- <HelloWorld/> -->
      <v-row justify="center">
        <v-col class="d-flex justify-space-around mt-10" cols="8">
          <h3 class="text-h3 blue-grey--text font-weight-bold">
            Stock of Products
          </h3>
          <!-- <v-btn color="blue-grey" class="white--text" large
            >New Ingrediente</v-btn
          > -->

          <v-dialog v-model="dialog" width="900">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red lighten-2" large dark v-bind="attrs" v-on="on">
                New Product
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2">
               <span class="text-h5 blue-grey--text font-weight-bold"> Ingredient Form</span>
              </v-card-title>

              <v-card-text>
                <v-form class="mx-5 py-5">
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
                      <input
                        type="file"
                        accept="image/*"
                        @change="handleImage"
                      />

                      <v-img
                        contain
                        max-height="150"
                        :src="form.image"
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
                      <v-btn color="red lighten-2" block dark class="mt-5" @click="closeModal()">Cancel</v-btn>
                    </v-col>
                    <v-col md="6">
                      <v-btn color=" blue-grey" dark block class="mt-5" >Create</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>

              <v-divider></v-divider>

              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  I accept
                </v-btn>
              </v-card-actions> -->
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
                <img
                  :src="require(`../../assets/ingredients/${item.image}`)"
                  :alt="item.name"
                />
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
import Navbar from "@/components/AdminProvider/Navbar.vue";

export default {
  name: "AdminProvider-Home",
  components: {
    Navbar,
  },
  data() {
    return {
      form: {
        name: "",
        image:
          "https://res.cloudinary.com/dx9n8tsyu/image/upload/v1604719543/inventory-umg/NotImage_rphrq6.png",
        description: "",
        quantity: "",
        price: "",
      },
      dialog: false,
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Image size should be less than 2 MB!",
      ],
      imageView: false,
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
      desserts: [
        {
          name: "Sugar Bag",
          image: "1.jpg",
          quantity: 5,
          actions: 1,
        },
        {
          name: "Salt Bag",
          image: "2.jpg",
          quantity: 37,
          actions: 2,
        },
        {
          name: "Milk",
          image: "3.jpg",
          quantity: 23,
          actions: 3,
        },
      ],
    };
  },
  methods: {
    getColor(quantity) {
      if (quantity < 10) return "red";
      else if (quantity < 25) return "orange";
      else return "green";
    },
    handleImage(e) {
      this.imageView = true;
      this.form.image = URL.createObjectURL(e.target.files[0]);
    },
    closeModal(){
        this.dialog= false;
    }
  },
};
</script>

<style></style>
