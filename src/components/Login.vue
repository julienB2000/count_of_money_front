<template>
  <div class="login-content-body">
    <div class="container d-flex flex-column form-content">
      <form class="w-100 login-form" ref="signin-form" @submit.prevent="login">
        <h2 class="text-center mb-4">Je me connecte</h2>
        <div class="mb-3">
            <label for="email" class="form-label">Adresse mail</label>
            <input type="email" class="form-control" id="email" required v-model="email">
            <div class="error" v-if="error">{{ error }}</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mot de passe</label>
            <input type="password" class="form-control" id="password" required v-model="password">
            <div class="error" v-if="error">{{ error }}</div>
          </div>
          <button type="submit" value="submit" class="btn btn-primary">Se connecter</button>
          <span class="mx-4">Ou</span>
          <button class="btn btn-primary" @click="authGoogle">Se connecter avec google</button>
          <!-- <a href="https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http://localhost:8080&scope=email&grand_type=authorization_code&access_type=offline&client_id=105190292336-t9rvmr92i7nrjop5m6o6g9fqbipiju70.apps.googleusercontent.com" tag="button">Sign in with Google</a> -->
      </form>
      <img class="fun-bird-2" src="../assets/Oiseau-2.png" alt="fun-bird-3d">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Api from '../api/api_user'

export default {
  // name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login: function () {
        let email = this.email
        let password = this.password
        this.$store.dispatch('login', { email, password })
       .then(() => {
         this.$router.push('/')
         })
       .catch(err => {
          this.error = 'Email or password incorrect'
          console.log(err)
        })
      },
      authGoogle: function () {
        window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http://localhost:8080&scope=email&grand_type=authorization_code&access_type=offline&client_id=105190292336-t9rvmr92i7nrjop5m6o6g9fqbipiju70.apps.googleusercontent.com"
      }
    // login() {
    //   Api.login(this.email, this.password).then((res) => {
    //     console.log('error', res)
    //     if (res) {
    //       localStorage.setItem('user', JSON.stringify(res.user));
    //       localStorage.setItem('logged', true);
    //       this.$router.push('/')
    //     } else {
    //         this.error = 'Email or password incorrect'  
    //     }
    //   }).catch((err) => {
    //     console.error(err);
    //   });
    // }
  }
}

</script>

<style scoped>
.login-content-body {
  height: 100%;
  background-image: url("../assets/background-Maquette.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.form-content {
  height: 100%;
  width: 40%;
}

.fun-bird-2
{
  position: relative;
  top: -40px; left: -327px;
  width: 400px;
}

.login-form {
  position: relative;
  background-color: rgb(100, 50, 80);
  padding: 50px;
  color: white;
  border-radius: 3%;
  top: 320px;
}

.error {
  text-align: start;
  color: red
}

</style>
