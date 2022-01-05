<template>
  <div class="container-fluid crypto-content-body">

    <div class="container-fluid banner">
      <div class="row justify-content-center">
        <div style="width: 45%">
          <img src="../assets/Logo-blanc.png" alt="logo" width="70%">
          <h3 class="mt-4" style="height: 40%">Votre meilleur allié dédié à la crypto</h3>
          <router-link class="btn btn-outline-info rounded-pill px-4 py-2" style="font-size: 1.2rem" to="/register">Créer mon compte</router-link>
        </div>
        <div class="row flex-column align-items-end" style="width: 45%">
          <div class="d-flex mt-4 justify-content-end my-account-button">
            <img class="col-2 me-2" src="../assets/user.svg">
            <router-link class="col-auto" to="/login" v-if="!isLoggedIn">Mon compte</router-link>
            <router-link class="col-auto" to="/" v-if="isLoggedIn">{{ this.user.firstname }}</router-link>
          </div>
          <img class="col-auto fun-bird" src="../assets/fun-bird-3d-illustration.png" alt="fun-bird-3d">
        </div>
      </div>
    </div>

    <div class="row" style="margin-top: 100px">
      <Navbar active-name="crypto" />
      <div class="col-9 crypto-table ms-5">
        <h3 class="mb-3">Crypto market</h3>
        <v-card dark style="background-color: rgb(255, 255, 255, 0);">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Rechercher"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="userCryptos"
            :search="search"
            style="background-color: rgb(255, 255, 255, 0);"
          >
          <template v-slot:item.image="{ item }">
            <img :src="item.image" style="width: 50px; height: 50px" />
          </template>
          </v-data-table>
        </v-card>
      </div>
    </div>

    <div class="container-fluid mt-5">
      <h3 class="ps-5 mb-3">Actus</h3>
      <div class="d-flex justify-content-center carousel">
          <div class="d-flex align-items-center arrow-carousel" v-on:click="scrollLeft">
            <img src="../assets/back.svg" alt="" style="color: black;" width="20">
          </div>
          <div class="d-flex flex-nowrap align-items-center items-carousel" id="items-carousel">
            <div class="item-carousel" v-for="actu in actus" :key="actu">
              <router-link style="text-decoration: none; color: white" :to="{name: 'Actu', params : {name: actu.name, id: actu.id}}">
                <img v-bind:src="actu.image" alt="">
                <h5 v-html="actu.title"></h5>
              </router-link>
            </div>
          </div>
          <div class="d-flex align-items-center arrow-carousel"  v-on:click="scrollRight">
            <img src="../assets/next.svg" alt="" width="20">
          </div>
      </div>
    </div>
    
      <br><br><br><br><br><br><br>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery';
import Navbar from '../components/Navbar.vue'
import Cryptos from '../components/Cryptos.vue'

export default {
  name: 'Crypto',
  components: {
    Navbar,
    Cryptos
  },
  created(){
    this.$store.dispatch('cryptoUser')
  },
  data: function() {
      return {
        user: this.$store.state.user,
        products: [],
        search: '',
        headers: [
          { text: '#', value: 'image' },
          { text: 'Name', value: 'name' },
          { text: 'Price', value: 'price' },
          { text: 'Lowest', value: 'lowest' },
          { text: 'Highest', value: 'highest' },
        ],
        cryptos: [],
        // cryptos: this.$store.state.crypto || [],
        actus: [
          {
            id: 1,
            name: 'nom-1',
            title: 'titre 1',
            image: 'https://picsum.photos/350/200',
          },
          {
            id: 2,
            name: 'nom-2',
            title: 'titre 2',
            image: 'https://picsum.photos/351/200',
          },
          {
            id: 3,
            name: 'nom-3',
            title: 'titre 3',
            image: 'https://picsum.photos/352/200',
          },
          {
            id: 4,
            name: 'nom-4',
            title: 'titre 4',
            image: 'https://picsum.photos/353/200',
          },
          {
            id: 5,
            name: 'nom-5',
            title: 'titre 5',
            image: 'https://picsum.photos/354/200',
          },
          {
            id: 6,
            name: 'nom-6',
            title: 'titre 6',
            image: 'https://picsum.photos/355/200',
          },
        ] 
      }
  },
  computed : {
    isLoggedIn : function(){
      return this.$store.getters.isLoggedIn
    },
    userinfo: function() { 
      this.user = this.$store.getters.userInfo
      return this.$store.getters.userInfo
    },
    userCryptos() { 
      return this.$store.getters.cryptosUser
    }
  },
  methods: {
    scrollRight() {
      var leftPos = $('#items-carousel').scrollLeft();
      $("#items-carousel").animate({scrollLeft: leftPos + 1300}, 1000);
    },
    scrollLeft() {
      var leftPos = $('#items-carousel').scrollLeft();
      $("#items-carousel").animate({scrollLeft: leftPos - 1300}, 1000);
    }
  },
}

</script>

<style scoped>
.crypto-content-body
{
  height: auto;
  background-image: url("../assets/background-Maquette.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding-top: 40px;
}

.banner
{
  background-color: rgb(20, 3, 36);
  color: white;
  border-radius: 80px;
  width: 90%;
}

.my-account-button img {
  width: 30px;
  filter: invert(43%) sepia(48%) saturate(1377%) hue-rotate(157deg) brightness(103%) contrast(102%);
}

.my-account-button a {
  font-size: 1.3rem;
  text-decoration: none;
  color: white;
}

.my-account-button a:hover {
  color: #00a4d6;
}

.fun-bird
{
  position: relative;
  top: 19.7%; left: 0px;
  width: 600px;
}

/* .v-card__title {
  background-color: rgb(30 30 30);
} */

.items-carousel {
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: hidden; 
  scrollbar-width: none;
  height: 250px;
}

.arrow-carousel {
  margin: 0px 15px 0px 15px;
}

.item-carousel {
  margin: 0px 30px 0px 0px;
  opacity: 0.90;
  height: 200px;
}

.item-carousel:hover {
  opacity: 1;
  box-shadow: 2px 2px 10px rgb(65, 65, 65);
  cursor: pointer;
}

.item-carousel img {
  border-radius: 5%;
}
</style>
