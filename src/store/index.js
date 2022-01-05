import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import VueJwtDecode from 'vue-jwt-decode'

Vue.use(Vuex)
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : JSON.parse(localStorage.getItem('user')) || {},
    // crypto: {
    //   name: '',
    //   lowValue: '',
    //   highValue: '',
    //   value: ''
    // },
    crypto : JSON.parse(localStorage.getItem('cryptosUser')) || [],
    cryptos: '',
    dailyCrypto: ''
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },

    auth_success(state, data){
      state.status = 'success'
      state.token = data.token
      state.user = data.user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.crypto = []
    },
    setCrypto(state, newVal){
      console.log("newVal setCrypto : ", newVal)
      state.crypto = newVal
    },
    setCryptos(state, newVal){
      state.cryptos = newVal
    },
    setDailyCrypto(state, newVal){
      state.dailyCrypto = newVal
    }
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://localhost:3000/users/login', data: user, method: 'POST' })
        .then(resp => {
          // token temporaire
          // const token = "sjkedhfozseiudhfzoeikjedmfksledk"
          const token = resp.data
          const user = VueJwtDecode.decode(token)
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          commit('auth_success', {token, user})
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          reject(err)
        })
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://localhost:3000/users/register', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          // const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          commit('auth_success', token, {name: "jordan", mail: 'j@d.com'})
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('cryptosUser')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    auth({commit}, code) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        console.log('auth store dispatch');
        axios({url: `http://localhost:3000/users/auth/google?code=${code}`, method: 'GET' })
        .then(resp => {
          const token = resp.data.id_token
          // const user = resp.data.user
          const user = VueJwtDecode.decode(token)
          localStorage.setItem('token', token)
          localStorage.setItem('user', user)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    cryptoUser({commit}) {
      axios({url: 'http://localhost:3000/users/profile', method: 'GET'})
      .then(result => {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        commit('setCrypto', result.data.user.cryptos)
        localStorage.setItem('cryptosUser', JSON.stringify(result.data.user.cryptos))
        console.log("result get profile : ", result.data.user.cryptos);
      })
      .catch(err => {
        console.log(err)
      });
    },
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userInfo: state => state.user,
    cryptosUser(state) {
      return state.crypto;
    }
  },
});
