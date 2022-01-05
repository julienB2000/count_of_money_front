<template>
  <div id="app">
    <router-view/>
    <Cryptos />
    <User />
  </div>
</template>


<script>
import Cryptos from './components/Cryptos.vue'
import User from './components/User.vue'
  export default {
    components: {
      Cryptos,
      User
    }
  }
</script>

<style>
html, body, #app
{
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(206, 206, 206);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
