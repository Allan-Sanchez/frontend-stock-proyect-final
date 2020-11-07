<template>
  <v-container >
    <Navbar :count="0"></Navbar>

    <v-main>
      <v-row>
        <v-col cols="12">
          
          <v-card v-for="(item,index) in products" :key="index">
            <div class="d-flex flex-no-wrap justify-space-around align-center">
              <v-avatar class size="100" tile>
                <v-img :src="require(`../assets/ingredients/${item.image}`)"></v-img>
              </v-avatar>
              <v-card-title class="headline">{{item.name}}</v-card-title>
              <div class="d-flex align-center">
                <v-btn fab dark small color="primary" @click="minusQuantity(item)">
                  <v-icon dark>mdi-minus</v-icon>
                </v-btn>
                <div class="mx-4">{{item.quantity}}</div>
                <v-btn fab dark small color="teal" @click="plusQuantity(item.id)">
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </div>
              <v-card-subtitle >
                 Price: ${{item.total}}
              </v-card-subtitle>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" class="d-flex justify-end align-center pr-10">
           <!-- to="/provider-state" -->
            <v-btn color="red" class="white--text" rounded @click="totalPay">
                Total Price $ {{total}}
            </v-btn>
        </v-col>
      </v-row>
    </v-main>
  </v-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "ProviderCart",
  components: {
    Navbar,
  },
  data() {
      return {
          total: this.$store.getters.totalPlusCart,
          products:this.$store.state.cartProduct,
          bill:null
      }
  },
  methods: {
    minusQuantity(item){
      if(item.quantity > 1){
      this.$store.commit('removeQuantity',item.id);
      this.total = this.$store.getters.totalPlusCart;  
      }
    },
    plusQuantity(id){
      this.$store.commit('plusQuantity',id);
      this.total = this.$store.getters.totalPlusCart;
    },
    totalPay(){
      let noBill =this.bill = Math.floor(Math.random() * 1000);
      let f = new Date();
      let fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear() + " - " + f.getHours() + ":" + f.getMinutes();
      let data = {
        bill:noBill,
        date: fecha,
        state:'requested'
      }
      this.$store.commit('addBill',data); 
      this.$router.push('/provider-state')

      setTimeout(() =>{
        data.state = 'in transit'
     
        this.$store.commit('addBill',data); 

      },30000);

      setTimeout(() =>{
        data.state = 'in transit'
     
        this.$store.commit('addBill',data); 

      },60000);
    
    }
  },
};
</script>

<style >
    #app{
        background: #CBD5E0;
    }
</style>