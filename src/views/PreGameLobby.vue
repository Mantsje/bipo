<template>
  <div class="PreGameLobby">
    <page-default :showSettings="false" header="Pre-Game Overview"/>
    <team-table/>
    <game-settings-view/>
    <ready-up/>
  </div>
</template>

<script>
import PageDefault from '../components/PageDefault'
import TeamTable from '../components/TeamTable'
import GameSettingsView from '../components/GameSettingsView'
import ReadyUp from '../components/ReadyUp'

export default {
  name: 'PreGameLobby',
  components: {
    PageDefault,
    TeamTable,
    GameSettingsView,
    ReadyUp
  }
}
</script>
