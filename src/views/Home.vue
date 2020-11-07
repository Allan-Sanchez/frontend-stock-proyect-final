<template>
  <div>
    <v-app-bar app color="blue-grey lighten-1" dark>
      <div class="d-flex align-center">
        <v-img
          alt="cake Logo"
          class="shrink mr-5"
          contain
          src="../assets/chocolate.svg"
          transition="scale-transition"
          width="40"
        />
        <span class="text-h4 font-weight-bold">World Cake</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2 font-weight-bold text-h6">Home</span>
      </v-btn>
      <v-btn
        class
        to="/provider-home"
        color="green lighter-2"
      >
        <span class="mr-2 font-weight-bold text-h6">Provider</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- <HelloWorld/> -->
      <v-row>
        <v-col class="d-flex justify-center mt-10">
          <h3 class="text-h3 blue-grey--text font-weight-bold">Stock of ingredients</h3>
        </v-col>
      </v-row>

      <v-row class="home mt-10" justify="center">
        <v-col cols="8">
          <!-- <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">Flour Bag</v-list-item-title>
          <v-list-item-subtitle>Currently there is <span class="font-weight-bold ">100 </span> flour</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80">
           <v-img
            class="elevation-6"
            src="../assets/cake.png"
          ></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn color="red lighten-2 white--text" >Order</v-btn>
        <v-btn color="green lighten-2 white--text">Reduce</v-btn>
      </v-card-actions>
          </v-card> -->
          <v-data-table :headers="headers" :items="desserts" class="elevation-1" :items-per-page="5">
            <template v-slot:item.image="{ item }">
              <v-avatar>
                <img :src="require(`../assets/ingredients/${item.image}`)" :alt="item.name" />
                <!-- <img :src="item.image" :alt="item.name" /> -->
              </v-avatar>
            </template>

            <template v-slot:item.quantity="{ item }">
              <v-chip :color="getColor(item.quantity)" dark>{{ item.quantity }}</v-chip>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {},
  data() {
    return {
      headers: [
        {
          text: "Name Product",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Image Product", value: "image" },
        { text: "Quantity", value: "quantity" },
      ],
      desserts: [
        {
          name: "Sugar Bag",
          image: '1.jpg',
          quantity: 5,
        },
        {
          name: "Salt Bag",
          image: '2.jpg',
          quantity: 37,
        },
        {
          name: "Milk",
          image: '3.jpg',
          quantity: 23,
        },
        {
          name: "Flour Bag",
          image: '4.jpg',
          quantity: 13,
        },
        {
          name: "Chocolate",
          image: '5.jpg',
          quantity: 43,
        },
        {
          name: "Butter",
          image: '6.jpg',
          quantity: 10,
        },
        {
          name: "Yeast",
          image: '7.jpg',
          quantity: 17,
        },
        {
          name: "Egg",
          image: '8.png',
          quantity: 37,
        },
        {
          name: "Vanilla",
          image: '9.jpeg',
          quantity: 47,
        },
      ],
    };
  },
  mounted() {

    this.getProduct();
  },
  methods: {
    getColor(quantity) {
      if (quantity < 10) return "red";
      else if (quantity < 25) return "orange";
      else return "green";
    },
    async getProduct(){
      let response = await axios.get('https://localhost:44399/api/users');
      console.log(response);
    }
  },
};
</script>
