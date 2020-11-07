<template>
  <v-container>
    <Navbar :count="count"></Navbar>
    <v-main>
      <v-row>
        <v-col v-for="(item, index) in arrayProducts" :key="index" cols="4">
          <v-card class="mx-auto my-12" max-width="374">
            <v-img height="200" :src="require(`../assets/ingredients/${item.image}`)"></v-img>

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
import Navbar from "@/components/Navbar.vue";
export default {
  name: "ProviderHome",
  components: {
    Navbar,
  },
  data() {
    return {
      count:0,
      arrayProducts: this.$store.state.products,
    };
  },
  methods: {
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