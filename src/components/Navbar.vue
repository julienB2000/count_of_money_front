<template>
  <div class="col-2 flex-column nav">
    <div v-on:click="activeLink = 'crypto'">
      <router-link class="nav-link" v-bind:style="[activeLink == 'crypto' ? pink : purple]" to="/"><img class="col-2 me-3" src="../assets/monitor.svg">Crypto</router-link>
    </div>
    <div v-on:click="activeLink = 'myCrypto'">
      <router-link class="nav-link" v-bind:style="[activeLink == 'myCrypto' ? pink : purple]" to="/"><img class="col-2 me-3" src="../assets/bitcoin.svg">Mes crypto</router-link>
    </div>
    <div v-on:click="activeLink = 'actus'">
      <router-link class="nav-link" v-bind:style="[activeLink == 'actus' ? pink : purple]" to="/"><img class="col-2 me-3" src="../assets/megaphone rose.svg">Actus</router-link>
    </div>
    <div v-on:click='logout'>
      <router-link class="nav-link" v-bind:style="[activeLink == 'logout' ? pink : purple]" to="" v-if="isLoggedIn" @click="logout">Logout</router-link>
    </div>
  </div>
</template>


<script>
    export default {
      name: 'Navbar',
      props: ['activeName'],
      data() {
        return {
          activeLink: this.activeName,
          pink: {
            'border-left': 'solid #71abff 8px',
            'color': '#71abff',
          },
          purple: {
            'border-left': 'solid purple 8px',
          }
        }
      },
      created() {
        let uri = window.location.search.substring(1); 
        let params = new URLSearchParams(uri);
        // console.log(params.get("code"));

        if (params.get("code")) {
          // console.log('code auth google : ', params.get("code"));
          this.$store.dispatch('auth', params.get("code"))
          .then((res) => {
            console.log('res auth');
            console.log(res)
            this.$router.push('/')
          })
        }
    // console.log(this.$route.query)


    // this.login()
    // this.logout()
      },
      computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
      },
      methods: {
        logout: function () {
          this.$store.dispatch('logout')
          .then(() => {
            this.$store.dispatch('cryptoUser')
            this.$router.push('/')
          })
        },
        login: function () {
          this.$router.push('/login')
        },
      },
    }
</script>

<style>
.nav-link {
  padding-left: 55px;
  margin-bottom: 35px;
  color: white;
  font-size: 1.4rem;
  border-radius: 3%;
}

.nav-link:hover{
  background-color: rgba(99, 47, 122, 0.548);
  color: white;
}
</style>

