<template>
  <div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store/index';

export default {
  name: 'Cryptos',
  data() {
    return {
    }
  },
  created() {
    // this.getCrypto()
    // this.getCryptos()
    // this.getPeriodCrypto()
  },
  methods: {
    getCrypto() {
      axios.get('http://localhost:3000/cryptos/bitcoin')
      .then(response => {
        console.log(response.data.result),
        this.crypto.name = response.data.result.name
        this.crypto.lowValue = response.data.result.lowest
        this.crypto.value = response.data.result.price
        this.crypto.highValue = response.data.result.highest
      })
      .catch(error => console.log(error))
    },
    getPeriodCrypto() {
      axios.get('http://localhost:3000/cryptos/BTC/history/daily')
      .then(response => {
        console.log(response)
        this.dailyCrypto = response.data
      })
      .catch(error => console.log(error))
    },
    getCryptos() {
      axios.get('http://localhost:3000/cryptos?cmids=bitcoin,ethereum')
      .then(response => {
        console.log(response)
        this.cryptos = response.data.result
      })
      .catch(error => console.log(error))
    }
  },
  computed: {
    crypto: {
      get: function() {
        return store.state.crypto
      },
      set: function(newVal) {
        console.log("setter : ", newVal);
        store.commit('setCrypto', newVal)
        // store.dispatch('cryptoUser', newVal)
      }
    },
    cryptos: {
      get: function() {
        return store.state.cryptos
      },
      set: function(newVal) {
        store.commit('setCryptos', newVal)
      }
    },
    dailyCrypto: {
      get: function() {
        return store.state.dailyCrypto
      },
      set: function(newVal) {
        store.commit('setDailyCrypto', newVal)
      }
    }
  }
}
</script>
