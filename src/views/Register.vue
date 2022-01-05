<template>
  <div class="register-content-body">
    <div class="container d-flex flex-column justify-content-center form-content">
      <form class="w-100 register-form" @submit.prevent="register">
        <div class="w-100 text-center" >
          <img src="../assets/Logo-blanc.png" alt="logo" width="50%">
        </div>
        <h2 class="text-center mb-4">Je crée mon compte</h2>
        <div class="mb-3">
            <label for="firstname" class="form-label">Prénom</label>
            <input type="firstname" class="form-control" id="firstname" v-model="firstname" required autofocus>
          </div>
          <div class="mb-3">
            <label for="lastname" class="form-label">Nom</label>
            <input type="lastname" class="form-control" id="lastname" v-model="lastname" required autofocus>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Adresse mail</label>
            <input type="email" class="form-control" id="email" v-model="email" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mot de passe</label>
            <input type="password" class="form-control" id="password" v-model="password" required>
          </div>
          <div class="mb-3">
            <label for="password-confirm" class="form-label">Confirmez votre mot de passe</label>
            <input type="password" class="form-control" id="password-confirm" v-model="password_confirmation" required>
          </div>
          <button type="submit" class="btn btn-primary">Enregistrer</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data(){
    return {
      firstname : "",
      lastname : "",
      email : "",
      password : "",
      password_confirmation : "",
      is_admin : 0
    }
  },
  methods: {
    register: function () {
      let data = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin
      }
      this.$store.dispatch('register', data)
      .then(() => this.$router.push('/'))
      .catch(err => console.log(err))
    }
  }
}
</script>


<style scoped>
.register-content-body {
  height: 100%;
  background-image: url("../assets/background-Maquette.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.form-content {
  height: 100%;
  width: 40%;
}

.register-form {
  background-color: rgb(100, 50, 80);
  padding: 50px;
  color: white;
  border-radius: 3%;
}
</style>