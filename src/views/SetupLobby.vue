<template>
  <div class="SettupLobby">
    <page-default :showSettings="false" header="Setup your game here!"/>
    <player-table/>
    <word-submission/>
    <game-settings-form v-if="$store.state.host === $store.state.thisPlayer.name"/>
    <game-settings-view v-else/>
  </div>
</template>

<script>
import PageDefault from '../components/PageDefault'
import PlayerTable from '../components/PlayerTable'
import WordSubmission from '../components/WordSubmission'
import GameSettingsView from '../components/GameSettingsView'
import GameSettingsForm from '../components/GameSettingsForm'

export default {
  name: 'SetupLobby',
  components: {
    PageDefault,
    PlayerTable,
    WordSubmission,
    GameSettingsView,
    GameSettingsForm
  }
}
</script>
