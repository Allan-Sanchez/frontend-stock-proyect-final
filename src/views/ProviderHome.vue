<template>
  <v-container>
    <Navbar :count="count"></Navbar>
    <v-main>
       <v-snackbar class="py-5" :color="snackbar.color" v-model="snackbar.show">
        {{ snackbar.text }}

        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar.show = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <v-row>
        <v-col v-for="(item, index) in arrayProducts" :key="index" cols="4">
          <v-card class="mx-auto my-12" max-width="374">
            <v-img height="200" :src="item.image"></v-img>

            <v-card-title>{{item.name}}</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="item.rating"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ml-4">{{item.rating}} ({{item.value}})</div>
              </v-row>

              <div class="my-4 subtitle-1">Price $ {{item.price}}</div>

              <div>{{item.description}}</div>
            </v-card-text>

            <v-card-actions class="d-flex justify-end">
              <v-btn v-if="item.active" color="red lighten-2" class="white--text" @click="addCart(item.id)">Add Cart</v-btn>
              <v-btn v-else color="blue lighten-2"  class="white--text" @click="substractCart(item.id)">Remove Cart</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-container>
</template>

<script>
import clientAxios from "@/config/AxiosClient";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "ProviderHome",
  components: {
    Navbar,
  },
  data() {
    return {
      snackbar: {
        show: false,
        text: `this is message`,
        color: "red lighten-2",
      },
      count:0,
      arrayProducts: [],
    };
  },
  async mounted() {
     await this.getData();
     this.arrayProducts = this.$store.state.products;
  },
  methods: {
    async getData() {
      this.desserts = [];
      try {
        let res = await clientAxios.get("providers");
        // console.log(res.data);
        this.$store.commit('getProduct',res.data);
        
      } catch (error) {
        this.snackbar.show = true;
        this.snackbar.text = "Error Product page not found";
        console.log(error);
      }
    },
    addCart(id) {
      this.count++;
      this.$store.commit('changeState',id);
      this.$store.commit('cartProduct',id);
      
    },
    substractCart(id){
      if(this.count > 0){
      this.count--;
      this.$store.commit('changeState',id)
      this.$store.commit('removeProduct',id)
      }
    }
  },
};
</script>