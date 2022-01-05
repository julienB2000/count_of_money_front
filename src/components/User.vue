<template>
  <div>
    {{ test }}
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store/index';

export default {
  name: 'User',
  data() {
    return {
    }
  },
  created() {
    // this.login()
    // this.register()
  },
  methods: {
    login() {
      const userInfos = {
        email: '',
        password: ''
      }
      axios.post('http://localhost:3000/users/login', userInfos)
      .then(response => console.log(response))
      .catch(error => console.log(error))
    },
    register() {
      const userInfos = {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      }
      axios.post('http://localhost:3000/users/register', userInfos)
      .then(response => console.log(response))
      .catch(error => console.log(error))
    }
  },
  computed: {
    test: {
      get: function() {
        return store.state.test
      },
      set: function(newVal) {
        store.commit('setTest', newVal)
      }
    }
  }
}
</script>
