<template>
  <div class="team-lobby">
    <page-default :showSettings="false" header="Team Lobby"/>
    <team-table/>
  <button v-on:click="startGame" v-if="$store.state.host === $store.state.thisPlayer.name" type="button">Start!</button>
  </div>
</template>

<script>
import PageDefault from '../components/PageDefault'
import TeamTable from '../components/TeamTable'
import { mapState } from 'vuex'

export default {
  name: 'TeamLobby',
  components: {
    PageDefault,
    TeamTable
  },
  computed: mapState({
    roundStatus: state => state.controller.roundStatus
  }),
  methods: {
    startGame: function () {
      this.$store.dispatch('controller/startRound')
    }
  }
}
</script>
