<template>
  <div class="SettupLobby">
    <page-default :showSettings="false" header="Setup your game here!"/>
    <player-table/>
    <word-submission/>
    <game-settings-view/>
  </div>
</template>

<script>
import PageDefault from '../components/PageDefault'
import PlayerTable from '../components/PlayerTable'
import WordSubmission from '../components/WordSubmission'
import GameSettingsView from '../components/GameSettingsView'

export default {
  name: 'SetupLobby',
  components: {
    PageDefault,
    PlayerTable,
    WordSubmission,
    GameSettingsView
  }
}
</script>
