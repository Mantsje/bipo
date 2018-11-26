<template>
  <div class="PreGameLobby">
    <page-default :showSettings="false" header="Pre-Game Overview"/>
    <game-settings-view/>
    <ready-up/>
  </div>
</template>

<script>
import PageDefault from '../components/PageDefault'
import GameSettingsView from '../components/GameSettingsView'
import ReadyUp from '../components/ReadyUp'

export default {
  name: 'PreGameLobby',
  components: {
    PageDefault,
    GameSettingsView,
    ReadyUp
  },
  // Check if each player is ready on update
  updated: function () {
    let host = this.$store.state.host
    let me = this.$store.state.thisPlayer
    if (this.$store.state.players.every((x) => x.ready)) {
      if (me.name === host) {
        this.$store.dispatch('controller/computeTeams')
        this.$store.dispatch('controller/initNextRound')
      }
      this.$router.push('/teamlobby')
    }
  }
}
</script>
