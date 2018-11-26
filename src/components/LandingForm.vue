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
      this.$store.dispatch('joinGame', { playerName: this.playerName, roomcode: this.roomcode })
    },
    onHost: function () {
      this.$store.dispatch('hostGame', { playerName: this.playerName })
    },
    toUpper: function () {
      this.roomcode = this.roomcode.toUpperCase()
    }
  }
}
</script>
