<template>
  <div>
    <Navbar />
    <v-main>
      <!-- <HelloWorld/> -->
      <v-row justify="center">
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
               <span class="text-h5 blue-grey--text font-weight-bold"> User Form</span>
              </v-card-title>

              <v-card-text>
                <v-form class="mx-5 py-5">
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
                      <v-btn color="red lighten-2" block dark class="mt-5" @click="closeModal()">Cancel</v-btn>
                    </v-col>
                    <v-col md="6">
                      <v-btn color=" blue-grey" dark block class="mt-5" >Create</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
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
            {{#lint}
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
  name: "AdminProvider-Users",
  components: {
    Navbar,
  },
  data() {
    return {
      form: {
        name: "",
        emial: "",
        password: "",
        passwordConfirm:""
      },
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
      desserts: [
        {
          name: "Sugar Bag",
          email: "admin@admin.com",
          actions: 1,
        },
        {
          name: "Salt Bag",
          email:"admin@admin.com",
          actions: 2,
        },
        {
          name: "Milk",
          email: "admin@admin.com",
          actions: 3,
        },
      ],
    };
  },
  methods: {
   
    handleImage(e) {
      this.imageView = true;
      this.form.image = URL.createObjectURL(e.target.files[0]);
    },
    closeModal(){
        this.dialog= false;
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
