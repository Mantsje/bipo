<template>
  <div class="landingform">
    <form>
      <div class="input-container">
        <input v-model="playerName" type="text" placeholder="Your Name"/>
        <input v-on:input="toUpper" v-model="roomcode" type="text" placeholder="Roomcode">
      </div>

      <button class="full-width" v-on:click="onJoin" type="button">Join</button>
      <p class="center">Or</p>
      <button class="full-width" v-on:click="onHost" type="button">Host a game</button>
    </form>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>
export default {
  name: 'LandingForm',
  data: function () {
    return {
      playerName: '',
      roomcode: ''
    }
  },
  methods: {
    onJoin: function () {
      this.$store.dispatch('joinGame', { playerName: this.playerName.trim(), roomcode: this.roomcode.trim() })
    },
    onHost: function () {
      this.$store.dispatch('hostGame', { playerName: this.playerName.trim() })
    },
    toUpper: function () {
      this.roomcode = this.roomcode.toUpperCase()
    }
  },
  created: function () {
    // Init circular dependency of store
    this.$store.commit('initHubConnection', { store: this.$store, router: this.$router })
  }
}
</script>
